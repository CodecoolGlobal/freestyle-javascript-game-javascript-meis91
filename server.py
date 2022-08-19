from flask import Flask, render_template, request
import data_manager

app = Flask(__name__, template_folder='templates', static_folder='static')


@app.route("/", methods=['GET', 'POST'])
def welcome():
    if request.method == 'POST':
        user_name = request.form["user_name"]
        data_manager.add_user_name(user_name)
        return index(user_name)
    return render_template('welcome.html')


@app.route("/index")
def index(user_name=None):
    score_list = data_manager.get_highscore_list()
    return render_template('index.html', score_list=score_list, user_name=user_name)


@app.route('/save_score', methods=['POST'])
def save_score():
    # TODO: Not working,
    #       doesn't get past request.json line (???)
    score = request.json["score"]
    data_manager.update_user_score(score)
    return score


if __name__ == "__main__":
    app.run(debug=True)
