from tornado import gen
from tornado import httpclient

from server.helpers.thread_pool import use_thread_pool

START_STR = 'display_src'

END_STR = 'caption'

WORD_ESCAPE_LEN = 4


@gen.coroutine
def fetch_pic_from_insta(url):
    res = yield httpclient.AsyncHTTPClient().fetch(url, validate_cert=False)

    @use_thread_pool
    def extract_image_url(response):
        html = response.body if isinstance(response.body, str) \
            else response.body.decode()

        start_escape_len = len(START_STR) + WORD_ESCAPE_LEN

        start = html.find('display_src')
        end = html.find('caption', start)

        image_url = html[start + start_escape_len:end - WORD_ESCAPE_LEN]

        assert image_url.startswith('https')

        return image_url

    url = yield extract_image_url(res)

    # fetch actual image
    image_res = yield httpclient.AsyncHTTPClient().fetch(url, validate_cert=False)

    return url, image_res.body
