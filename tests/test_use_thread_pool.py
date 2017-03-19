import time

from tornado.testing import AsyncTestCase
from tornado.testing import gen_test

from server.helpers.thread_pool import use_thread_pool


class TestUse_thread_pool(AsyncTestCase):

    @gen_test
    def test_decorator(self):
        result = yield self.async_func()
        self.assertTrue(result == 20)

    @use_thread_pool
    def async_func(self):
        time.sleep(0.5)
        return 10 + 10
