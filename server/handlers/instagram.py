import json

from tornado import gen
from tornado.httpclient import HTTPError

from server.core.fetch import fetch_pic_from_insta
from server.handlers.common.handler import BaseRequestHandler


class InstaUrlHandler(BaseRequestHandler):
    @gen.coroutine
    def post(self):
        insta_url = json.loads(self.request.body)['insta_url']

        if self.is_valid_url(insta_url):
            try:
                image_url, image = yield fetch_pic_from_insta(insta_url)

                predictions = yield self.process_image(image)

                if predictions:
                    self.write({'results': predictions, 'image_url': image_url})

            except HTTPError as error:
                self.set_status(400)
                if error.code == 404:
                    self.finish({"reason": "Could not find image. Make sure profile is not private"})
                else:
                    self.finish({"reason": "Unable to fetch image"})

    def is_valid_url(self, url):
        if not self.check_url(url):
            return False
        if not url.startswith('https://www.instagram.com'):
            self.set_status(400)
            self.finish({"reason": "Invalid URL. Make sure you provided valid instagram link"})
        return True
