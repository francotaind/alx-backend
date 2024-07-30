#!/usr/bin/env python3
"""Basic Flask app, index page"""

from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    """Index
    Returns:
        str: HTML
    """
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
