import os

import tornado.httpserver
import tornado.ioloop
import tornado.web

from server.core.popular import popular_categories
from server.core.predict import predictor
from server.handlers import queue, image, instagram, image_url, main
from server.helpers.argparse import ArgParser
from server.settings import configuration

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
        debug=configuration.debug,
        autoreload=configuration.autoreload)


def start_server(application):
    server = tornado.httpserver.HTTPServer(application)
    server.listen(8080)
    server.start(configuration.processes)
    tornado.ioloop.PeriodicCallback(popular_categories.process_queue, configuration.queue_process_interval).start()
    tornado.ioloop.IOLoop.current().start()


if __name__ == '__main__':
    configuration.configure(ArgParser().parse_args())
    predictor.configure_session()
    start_server(make_app())
