#!/usr/bin/env python
import json

from flask import Flask
app = Flask(__name__)


@app.route("/")
def hello():
    return "Hello World!"


@app.route("/messages")
def messages():
    return json.dumps([
        "hello there :^)",
        "these are fake messages!",
        "hopefully the dev server works",
    ])


if __name__ == "__main__":
    app.run()
