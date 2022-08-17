from flask import Flask, render_template, request
import data_manager

app = Flask(__name__, template_folder='templates', static_folder='static')


@app.route("/", methods=['GET', 'POST'])
def index():
    score_list = data_manager.get_highscore_list()
    return render_template('index.html', score_list=score_list)