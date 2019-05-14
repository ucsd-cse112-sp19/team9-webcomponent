#!/usr/bin/env python
import json
import random
import time

from flask import Flask, Response
app = Flask(__name__)


@app.route("/")
def hello():
    return "Hello World!"


@app.route("/messages")
def messages():
    boundary = "frame"
    return Response(
        random_msg_stream(boundary),
        mimetype='multipart/x-mixed-replace; boundary={}'.format(boundary)
    )


def random_msg_stream(boundary):
    boundary = "--{}".format(boundary)
    for _ in xrange(0, random.randint(1, 30)):
        time.sleep(0.5)
        msg = random_msg()
        yield "\r\n".join([
            boundary,
            "Content-Length: {}".format(len(msg)),
            "\r\n",
        ]).encode('utf-8')
        yield msg


def random_msg():
    length = random.randint(5, 25)
    return str.join('', [str(chr(random.randint(65, 90))) for _ in xrange(0, length)])


if __name__ == "__main__":
    app.run()
