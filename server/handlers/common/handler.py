import re
import uuid

import tornado.web
from tornado import gen

from server.core.buffer import image_buffer
from server.settings import MAX_IMAGE_UPLOAD_SIZE_BYTES, MAX_IMAGE_UPLOAD_SIZE_MB

VALID_URL_REGEX = re.compile(
    r'^(?:http)s?://'  # http:// or https://
    r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'  # domain...
    r'localhost|'  # localhost...
    r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...or ip
    r'(?::\d+)?'  # optional port
    r'(?:/?|[/?]\S+)$', re.IGNORECASE)


class BaseRequestHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

    def prepare(self):
        self.identifier = uuid.uuid4()

    def options(self, *args, **kwargs):
        # no body
        self.set_status(204)
        self.finish()

    def check_url(self, url):
        if not bool(re.match(VALID_URL_REGEX, url)):
            self.set_status(400)
            self.finish({"reason": "Invalid URL"})
            return False
        return True

    @gen.coroutine
    def process_image(self, image):
        # put message into a waiting set
        if self.has_valid_size(image):
            try:
                predictions = yield image_buffer.wait_for_image_processing(image, self.identifier)
                return predictions
            except Exception as e:
                print(e)
                self.set_status(400)
                self.finish({"reason": "Unable to process the image. Try using another source"})

    def on_connection_close(self):
        image_buffer.cancel_wait(self.identifier)

    def has_valid_size(self, image):
        if type(image) is bytes:
            image_size = len(image)
        else:
            image_size = len(image.body)

        if image_size > MAX_IMAGE_UPLOAD_SIZE_BYTES:
            self.set_status(400)
            self.finish({"reason": "Image should be less than: {0} MB".format(MAX_IMAGE_UPLOAD_SIZE_MB)})
            return False

        return True
