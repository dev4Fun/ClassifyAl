import os

import tensorflow as tf

QUEUE_PROCESS_INTERVAL = 1000 * 10  # 1 min

__bytes_in_mb = 1048576
MAX_IMAGE_UPLOAD_SIZE_BYTES = 5242880
MAX_IMAGE_UPLOAD_SIZE_MB = MAX_IMAGE_UPLOAD_SIZE_BYTES / __bytes_in_mb

JPEG_TYPE = 'image/jpeg'
PNG_TYPE = 'image/png'
VALID_IMAGE_TYPES = {JPEG_TYPE, PNG_TYPE}

GRAPH_PATH = os.path.join(os.path.dirname(__file__), "graph", "image_graph.pb")
LABELS_PATH = os.path.join(os.path.dirname(__file__), "graph", "image_labels.txt")

IMAGE_LABELS = [line.rstrip() for line in tf.gfile.GFile(LABELS_PATH)]