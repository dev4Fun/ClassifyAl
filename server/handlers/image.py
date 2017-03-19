from tornado import gen

from server.conf import VALID_IMAGE_TYPES
from server.handlers.common.handler import BaseRequestHandler


class ImageUploadHandler(BaseRequestHandler):
    @gen.coroutine
    def post(self):
        image_files = self.request.files
        if image_files and self.check_image(image_files):
            image = image_files['image'][0]

            predictions = yield self.process_image(image)

            if predictions:
                self.write({'results': predictions})

    def check_image(self, image_files):
        valid = True

        image_type = image_files['image'][0]['content_type']

        if len(image_files) is not 1 or 'image' not in image_files:
            valid = False
        elif image_type not in VALID_IMAGE_TYPES:
            valid = False

        if not valid:
            self.set_status(400)
            self.finish({"reason": "Incorrectly specified image"})

        return valid
