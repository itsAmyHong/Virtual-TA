from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from utils.text_processing import extract_text_from_pdf, split_text
from utils.text_embedding import embed_texts, search_texts
from utils.llm_interface import text_chat
#import subprocess

app = Flask(__name__)
CORS(app)

# API endpoint to handle questions
@app.route("/api/ask", methods=["POST"])
def ask():
    question = request.json.get("question") # Holds the sentence
    question_category = classify(question) # Holds the category
    #print(question_category)  # For debugging, consider logging instead
    if question_category == 'Syllabus-related':
        text_embeddings = process_text('texts/syllabus.pdf')
        system_state = request.json.get("system", "default system state")
        #print(system_state)
        response = generate_response(question, text_embeddings, system_state)
        return jsonify({"response": response})
    elif question_category == 'Math-related':
        text_embeddings = process_text('texts/syllabus.pdf') # Replace with Math related texts
        system_state = request.json.get("system", "default system state") 
        response = generate_response(question, text_embeddings, system_state)
        return jsonify({"response": response})
    else:
        text_embeddings = process_text('texts/syllabus.pdf') # Replace with general llm query
        system_state = request.json.get("system", "default system state")
        response = generate_response(question, text_embeddings, system_state)
        return jsonify({"response": response})

# Function to classify sentences into categories.
def classify(sentence):
    # Keywords for each category
    keywords_syllabus = ["syllabus", "schedule", "office hours", "grade structure", "ta","grade"
    ,"date","assignments","assignment","section","class","term","day","days","time","times","proffesor","email","hours","office","earning Objectives","learning","final","mideterm","grading"]
    keywords_math = ["O(n)", "algorithm time complexity", "mathematics","plus","add","subtract","derivative","integral","complexity","time","times","run time","runtime","multiply"]
    keywords_general = ["merge sort", "binary search tree", "algorithm analysis","explain","how","does","algorithm","code","what","concept","example","analize","data","structure"]

    sentence = sentence.lower()

    # Count keyword occurrences in each category
    count_syllabus = sum(keyword in sentence for keyword in keywords_syllabus)
    count_math = sum(keyword in sentence for keyword in keywords_math)
    count_general = sum(keyword in sentence for keyword in keywords_general)

    # Determine the most popular category
    counts = {
        "Syllabus-related": count_syllabus,
        "Math-related": count_math,
        "General": count_general,
    }

    most_popular_group = max(counts, key=counts.get)
    return most_popular_group if counts[most_popular_group] > 0 else "General"

# Function to generate a response using a subprocess
def generate_response(query, text_embeddings, system_state):
    # Placeholder command, to be replaced with actual logic
    
    #command = f"echo {query}"
    """
    # Construct the command to interact with Llama2
    command = f"llm -m l2c '{query}'
    
    try:
        # Execute the command
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
        # Handle subprocess errors
        response = e.stderr
    """
    # Search the text embeddings for chunks relevent to the user's query
    relevant_texts = search_texts(text_embeddings=text_embeddings, query=query)
    response = text_chat(relevant_texts=relevant_texts, query=query)
    return response

def process_text(file_path: str):
    # Construct the absolute file path
    current_directory = os.path.dirname(__file__)
    absolute_file_path = os.path.join(current_directory, file_path)

    # Extract and chunk text from PDF
    raw_text = extract_text_from_pdf(file_path=absolute_file_path) # Type(str); 9445 characters
    chunks = split_text(raw_text=raw_text) # Type(list); length = 53
    # Generate text embeddings and initialize the FAISS object for similarity search
    text_embeddings = embed_texts(chunks=chunks) # Type(<class 'langchain.vectorstores.faiss.FAISS'>); Location(<langchain.vectorstores.faiss.FAISS object at 0x...>)
    return text_embeddings

if __name__ == "__main__":
    app.run(debug=True, port=5000)
