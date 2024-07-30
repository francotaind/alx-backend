##FLASK

### What is Flask?
Flask is a micro web framework written in Python. It is classified as a
microframework because it does not require particular tools or libraries. It has
no database abstraction layer, form validation, or any other components where
pre-existing third-party libraries provide common functions. However, Flask
supports extensions that can add application features as if they were
implemented in Flask itself. Extensions exist for object-relational mappers,
form validation, upload handling, various open authentication technologies and
several common framework related tools.


### How to install Flask?
To install Flask, you can use pip, which is the Python package manager. You can
install Flask by running the following command:

```bash
pip install Flask
```

### How to create a Flask app?
To create a Flask app, you need to create a new Python file and import Flask.
Then, you can create a new Flask app by calling the `Flask` constructor. Here is
an example of a simple Flask app:

```python
from flask import FLASK

app = Flask(__name__)



