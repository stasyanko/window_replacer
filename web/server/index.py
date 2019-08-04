from flask import Flask, render_template
from object_detector import get_window_coords

import json

app = Flask(__name__)


@app.route('/')
def index():
    coords = json.dumps(get_window_coords())
    return render_template('index.html', coords=coords)


if __name__ == '__main__':
    app.run(debug=True)
