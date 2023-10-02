from flask import Flask, request

from scripts.process_flow import run as process_flow
from scripts.save_policy import run as save_policy

app = Flask(__name__)


@app.route("/policy/publish", methods=["POST"])
def decision():
    try:
        policy = process_flow(request.get_json()["nodes"])
        if save_policy(policy):
            return "Policy updated", 200
        return "Error updating policy", 500

    except ValueError as e:
        return f"Invalid node type: {str(e)}", 400


if __name__ == "__main__":
    app.run(debug=True)
