from flask import Flask, request, jsonify
from flask_cors import CORS

from scripts.decision import run as decide
from scripts.get_policy import run as get_policy

app = Flask(__name__)
CORS(app)


@app.route("/decide", methods=["POST"])
def decision():
    try:
        decision = decide(get_policy(), request.get_json())
        return jsonify(decision=decision), 200
    except ValueError as e:
        return str(e), 500
    except KeyError as e:
        return f"Missing param: {str(e)}", 400


if __name__ == "__main__":
    app.run(debug=True)
