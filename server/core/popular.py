from tornado import gen
from tornado.queues import Queue

from server.conf import IMAGE_LABELS
from server.handlers.queue import update_top_5
from server.helpers.formatter import to_json_result


class PopularCategories:
    def __init__(self):
        self.categories = {}
        self.update_queue = Queue()

    @gen.coroutine
    def add_for_processing(self, predictions):
        yield self.update_queue.put(predictions)

    @gen.coroutine
    def process_queue(self):
        if self.update_queue.qsize() > 0:
            for i in range(self.update_queue.qsize()):
                predictions = yield self.update_queue.get()
                try:
                    self._update_categories(predictions)
                finally:
                    self.update_queue.task_done()

            # update top 5
            top_5 = sorted(self.categories.items(), key=lambda x: x[1], reverse=True)[:5]
            mapped = map(lambda x: to_json_result(x[0], x[1]), top_5)
            yield update_top_5(list(mapped))

    def _update_categories(self, new_predictions):
        predictions = new_predictions.argsort()[0]

        #  update categories total
        for prediction in predictions:
            label = IMAGE_LABELS[prediction]
            score = new_predictions[0][prediction]

            if label in self.categories:
                update_score = (self.categories[label] + score) / 2
            else:
                update_score = score

            self.categories[label] = update_score


popular_categories = PopularCategories()
