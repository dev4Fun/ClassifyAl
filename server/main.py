import os

import tornado.httpserver
import tornado.ioloop
import tornado.web

from server.conf import QUEUE_PROCESS_INTERVAL
from server.core.popular import popular_categories
from server.handlers import queue, image, instagram, image_url, main


static_root = os.path.join(os.path.dirname(__file__), "static", "front_end", "build")
template_root = static_root


def make_app():
    return tornado.web.Application([
        (r"/", main.MainHandler),
        (r"/most-popular", queue.QueueSocket),
        (r"/image", image.ImageUploadHandler),
        (r"/insta", instagram.InstaUrlHandler),
        (r"/image-url", image_url.ImageUrlHandler),
        (r"/(.*)", tornado.web.StaticFileHandler, {'path': static_root})
    ],
        template_path=template_root,
        debug=True,
        autoreload=True)


if __name__ == '__main__':
    app = make_app()
    server = tornado.httpserver.HTTPServer(app)
    server.listen(8080)
    server.start(1)
    tornado.ioloop.PeriodicCallback(popular_categories.process_queue, QUEUE_PROCESS_INTERVAL).start()
    tornado.ioloop.IOLoop.current().start()

