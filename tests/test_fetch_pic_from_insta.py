from tornado.testing import AsyncTestCase
from tornado.testing import gen_test

from server.core.fetch import fetch_pic_from_insta


class Test_fetch_pic_from_insta(AsyncTestCase):

    @gen_test
    def test_fetch_pic_from_insta(self):
        image = yield fetch_pic_from_insta("https://www.instagram.com/p/BP-TGQOFB8G/")
        self.assertIs(type(image), bytes)
