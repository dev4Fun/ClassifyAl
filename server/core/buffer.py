from tornado import gen

from server.core.predict import predictor
from server.helpers.image_util import png_to_jpeg
from server.helpers.thread_pool import use_thread_pool
from server.settings import PNG_TYPE


class ImageBuffer:
    def __init__(self):
        self.waiting_for_processing = set()

    @gen.coroutine
    def wait_for_image_processing(self, image, identifier):

        yield self._add_task(identifier)

        thread_future = self._get_predictions(image)

        if identifier in self.waiting_for_processing:
            predictions = yield thread_future
            yield self._complete_task(identifier)
            return predictions
        else:
            return

    async def cancel_wait(self, identifier):
        await self._complete_task(identifier)

    async def _add_task(self, identifier):
        self.waiting_for_processing.add(identifier)

    async def _complete_task(self, identifier):
        self.waiting_for_processing.discard(identifier)

    @use_thread_pool
    def _get_predictions(self, image):
        if type(image) is bytes:
            return predictor.get_jpeg_predictions(image)
        elif image.content_type == PNG_TYPE:
            return predictor.get_png_converted_predictions(png_to_jpeg(image.body))
        else:
            return predictor.get_jpeg_predictions(image.body)


image_buffer = ImageBuffer()
