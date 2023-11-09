from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import pandas as pd
from collections import Counter

app = Flask(__name__)
CORS(app)


def classify(sentence):
    keywords_syllabus = [
        "syllabus",
        "schedule",
        "office hours",
        "grade structure",
        "ta",
        "grade",
        "date",
        "assignments",
        "assignment",
        "section",
        "class",
        "term",
        "day",
        "days",
        "time",
        "times",
        "proffesor",
        "email",
        "hours",
        "office",
        "earning Objectives",
        "learning",
        "final",
        "mideterm",
        "grading",
    ]
    keywords_math = [
        "O(n)",
        "algorithm time complexity",
        "mathematics",
        "plus",
        "add",
        "subtract",
        "derivative",
        "integral",
        "complexity",
        "time",
        "times",
        "run time",
        "runtime",
        "multiply",
    ]
    keywords_general = [
        "merge sort",
        "binary search tree",
        "algorithm analysis",
        "explain",
        "how",
        "does",
        "algorithm",
        "code",
        "what",
        "concept",
        "example",
        "analize",
        "data",
        "structure",
    ]

    sentence = sentence.lower()

    # Count how many times words in the sentence appear in each group
    count_syllabus = sum(keyword in sentence for keyword in keywords_syllabus)
    count_math = sum(keyword in sentence for keyword in keywords_math)
    count_general = sum(keyword in sentence for keyword in keywords_general)

    # Find the most popular group
    counts = {
        "Syllabus-related": count_syllabus,
        "Math-related": count_math,
        "General": count_general,
    }

    most_popular_group = max(counts, key=counts.get)
    return most_popular_group if counts[most_popular_group] > 0 else "General"


@app.route("/api/ask", methods=["POST"])
def ask():
    question = request.json.get("question")

    # not currently doing anything with this info because we only have one language model
    question_category = classify(question)
    print(question_category)

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
