import json

from tornado import gen, httpclient

from server.handlers.common.handler import BaseRequestHandler


class ImageUrlHandler(BaseRequestHandler):
    @gen.coroutine
    def post(self):
        url = json.loads(self.request.body)['url']

        if self.is_valid_url(url):
            image_res = yield httpclient.AsyncHTTPClient().fetch(url, validate_cert=False)

            if self.check_headers(image_res.headers):

                predictions = yield self.process_image(image_res.body)
                if predictions:
                    self.write({'results': predictions, 'image_url': url})

    def is_valid_url(self, url):
        return self.check_url(url)

    def check_headers(self, headers):
        if not headers['Content-Type'].startswith('image'):
            self.set_status(400)
            self.finish({"reason": "Incorrectly specified image"})
            return False
        return True
