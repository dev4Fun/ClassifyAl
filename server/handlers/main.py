import tornado.web

class MainHandler(tornado.web.RequestHandler):
    def get(self, *args, **kwargs):
        self.render("index.html")
