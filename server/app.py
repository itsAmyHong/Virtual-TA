from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)


@app.route("/api/ask", methods=["POST"])
def ask():
    question = request.json.get("question")
    system_state = request.json.get("system", "default system state")

    response = generate_response(question, system_state)
    return jsonify({"response": response})


def generate_response(prompt, system_state):
    # Constructing the command to call the language model
    # command = f"llm -m l2c '{prompt}' --system '{system_state}'"
    command = f"echo {prompt}"

    try:
        # Run the command and get the output
        process = subprocess.run(
            command,
            shell=True,
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            universal_newlines=True,
        )
        response = process.stdout
    except subprocess.CalledProcessError as e:
        # error message
        response = e.stderr
        # not sure how to handle the error yet

    return response


if __name__ == "__main__":
    app.run(debug=True, port=5000)
