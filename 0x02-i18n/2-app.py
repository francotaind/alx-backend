#!/usr/bin/env python3
"""flask app that detects the best language to use"""

from flask import Flask, request
from flask_babel import Babel

app = Flask(__name__)

# Config class with language and timezone settings
class Config:
    LANGUAGES = ["en", "fr"]           # Supported languages
    BABEL_DEFAULT_LOCALE = "en"        # Default language
    BABEL_DEFAULT_TIMEZONE = "UTC"     # Default timezone

# Apply the Config class to the app's configuration
app.config.from_object(Config)

# Initialize Babel
babel = Babel(app)

# Define the get_locale function to determine the best language match
def get_locale():
    return request.accept_languages.best_match(app.config['LANGUAGES'])

# Register the locale selector function
babel.init_app(app, locale_selector=get_locale)

# Basic route to test language detection
@app.route('/')
def index():
    return "Language selected: " + get_locale()

if __name__ == '__main__':
    app.run(debug=True)
