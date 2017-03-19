import tornado.websocket

from tornado import gen

# from server.core.popular import popular_categories

_clients = set()
_top_5 = []


class QueueSocket(tornado.websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True

    @gen.coroutine
    def open(self, *args, **kwargs):
        if self not in _clients:
            _clients.add(self)
            yield self.write_message(to_json(_top_5))

    def on_close(self):
        _clients.discard(self)


@gen.coroutine
def update_top_5(top_5):
    global _top_5
    _top_5 = top_5
    yield [client.write_message(to_json(_top_5)) for client in _clients]


def to_json(predictions):
    return {'top_5': predictions}
