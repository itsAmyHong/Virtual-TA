from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # enable CORS for all routes


@app.route('/api/ask', methods=['POST'])
def ask():
    data = request.json
    question = data.get('question', '')
    # process the question and generate a response.
    response = f"You asked: {question}"
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
