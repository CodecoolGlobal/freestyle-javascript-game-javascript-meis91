import json

from flask import Flask, render_template, request, redirect, url_for
import data_manager

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route("/", methods=['GET', 'POST'])
def welcome():
    if request.method == 'POST':
        user_name = request.form["user_name"]
        data_manager.add_user_name(user_name)
        return index(user_name)
    return render_template('welcome.html')

@app.route("/index", methods=['GET', 'POST'])
def index(user_name=None):
    score_list = data_manager.get_highscore_list()
    return render_template('index.html', score_list=score_list, user_name=user_name)

@app.route('/save_score/<score>', methods=["GET", "POST"])
def saveScore(score):
    data_manager.update_user_score(score)
    print(score)
    return score

if __name__ == "__main__":
    app.run(debug=True)