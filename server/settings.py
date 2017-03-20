import tensorflow as tf

__bytes_in_mb = 1048576
MAX_IMAGE_UPLOAD_SIZE_BYTES = 5242880
MAX_IMAGE_UPLOAD_SIZE_MB = MAX_IMAGE_UPLOAD_SIZE_BYTES / __bytes_in_mb

JPEG_TYPE = 'image/jpeg'
PNG_TYPE = 'image/png'
VALID_IMAGE_TYPES = {JPEG_TYPE, PNG_TYPE}


class _Configuration:
    def __init__(self):
        self.graph_path = None
        self.image_labels = None
        self.processes = 1
        self.queue_process_interval = 10000

    def configure(self, args):
        self.graph_path = args.graph_path
        self.image_labels = [line.rstrip() for line in tf.gfile.GFile(args.labels_path)]
        self.processes = args.processes
        self.queue_process_interval = args.queue_process_interval
        self.autoreload = args.autoreload
        self.debug = args.debug


configuration = _Configuration()
