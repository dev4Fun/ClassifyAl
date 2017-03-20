import numpy as np
import tensorflow as tf

from server.core.popular import popular_categories
from server.helpers.formatter import to_json_result
from server.settings import configuration


class _Predictor:
    def __init__(self):
        self.session = None
        self.softmax_tensor = None

    def get_jpeg_predictions(self, image_data):
        predictions = self.session.run(self.softmax_tensor, {'DecodeJpeg/contents:0': image_data})
        return _convert_predictions(predictions)

    def get_png_converted_predictions(self, image_data):
        predictions = self.session.run(self.softmax_tensor, {'DecodeJpeg:0': image_data})
        return _convert_predictions(predictions)

    def configure_session(self):
        if self.session is None:
            # load stored graph
            with tf.gfile.GFile(configuration.graph_path, "rb") as f:
                graph_def = tf.GraphDef()
                graph_def.ParseFromString(f.read())

            with tf.Graph().as_default() as graph:
                tf.import_graph_def(graph_def, name='')

            # open session
            self.session = tf.Session(graph=graph)
            self.softmax_tensor = self.session.graph.get_tensor_by_name('final_result:0')


def _convert_predictions(predictions):
    top_5 = np.fliplr(predictions.argsort())[0][:5]

    popular_categories.add_for_processing(predictions)

    result = []
    for node in top_5:
        label = configuration.image_labels[node]
        score = predictions[0][node]
        result.append(to_json_result(label, score))

    return result


predictor = _Predictor()
