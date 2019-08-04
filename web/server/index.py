from flask import Flask
from object_detector import get_window_coords

app = Flask(__name__)


@app.route('/')
def index():
    return get_window_coords()


if __name__ == '__main__':
    app.run(debug=True)
