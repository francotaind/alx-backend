#!/usr/bin/env python3
"""Flask app with internationalization support and user login"""

from flask import Flask, render_template, request, g
from flask_babel import Babel

app = Flask(__name__)
babel = Babel(app)

# Mock user table
users = {
   1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
   2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
   3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
   4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


class Config:
   """Configuration class for Flask app"""
   LANGUAGES = ["en", "fr"]
   BABEL_DEFAULT_LOCALE = "en"
   BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


def get_user():
   """Returns user dictionary if ID exists, None otherwise"""
   login_id = request.args.get('login_as')
   if login_id:
       return users.get(int(login_id))
   return None


@app.before_request
def before_request():
   """Sets user as global on flask.g.user"""
   g.user = get_user()


@babel.localeselector
def get_locale():
   """Determine the best match with support for URL parameters"""
   locale = request.args.get('locale')
   if locale and locale in app.config['LANGUAGES']:
       return locale
   return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index():
   """Render the home/index page"""
   return render_template('5-index.html')


if __name__ == '__main__':
   app.run(debug=True)
