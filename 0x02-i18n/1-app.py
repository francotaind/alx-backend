#!/usr/bin/env python3
"""
This module sets up a Flask app with Babel for internationalization.
"""

from flask import Flask, render_template
from flask_babel import Babel
from typing import List


class Config:
    """Configuration class for Flask app."""
    LANGUAGES: List[str] = ["en", "fr"]
    BABEL_DEFAULT_LOCALE: str = "en"
    BABEL_DEFAULT_TIMEZONE: str = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@app.route('/')
def index() -> str:
    """
    Render the index page.

    Returns:
        str: Rendered HTML content of the index page.
    """
    return render_template('1-index.html')


if __name__ == '__main__':
    app.run(debug=True)
