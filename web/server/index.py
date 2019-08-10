from flask import Flask, flash, render_template, request, redirect, url_for
from object_detector import get_window_coords
from werkzeug.utils import secure_filename
from os.path import join, dirname
from dotenv import load_dotenv

import os
import json
import random
import string

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

BASE_URL = os.environ.get("BASE_URL")
UPLOAD_FOLDER = os.environ.get("UPLOAD_FOLDER")
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['BASE_URL'] = os.environ.get("BASE_URL")


@app.route('/', methods=['GET', 'POST'])
def upload_file():
    coords = ""
    filename = ""
    windows = json.dumps(os.listdir(UPLOAD_FOLDER + "/windows"))
    slider_btn_range = range(0, round(len(windows) / 4))

    if request.method == 'POST':
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit a empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = randomString()
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            coords = json.dumps(get_window_coords(filename))

    return render_template('index.html', windows=windows, slider_btn_range=slider_btn_range, coords=coords, filename=filename)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def randomString(stringLength=12):
    letters = string.ascii_lowercase
    return ''.join(random.sample(letters, stringLength))


if __name__ == '__main__':
    app.run(debug=True)
