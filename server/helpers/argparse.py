import argparse

import os.path


class ArgParser:
    def __init__(self):
        self.parser = argparse.ArgumentParser(description="Starts Tornado server for serving image classifier")

        self.parser.add_argument("graph_path", help='path to a graph file', type=str)
        self.parser.add_argument("labels_path", help='path to labels file for graph', type=str)

        self.parser.add_argument('-p', '--processes', metavar='#processes', type=int, nargs='?',
                                 help="number of processes to use when running server. 0 forks 1 process per CPU",
                                 default=1)
        self.parser.add_argument('-d', '--debug', help="turn debug on", action="store_true")
        self.parser.add_argument('-ar', '--autoreload', help="turn autoreload on", action="store_true")
        self.parser.add_argument('-q', '--queue_process_interval', help="queue polling interval in ms", type=int,
                                 default=10000)

    def parse_args(self):
        args = self.parser.parse_args()

        self.check_file_path(args.graph_path)
        self.check_file_path(args.labels_path)

        if args.debug:
            print(args)

        return args

    def check_file_path(self, path):
        if not os.path.exists(path):
            self.parser.exit(message="{0} does not exist \n".format(path))

        elif not os.path.isfile(path):
            self.parser.exit(message="{0} is not a file \n".format(path))
