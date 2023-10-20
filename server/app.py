from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import GPTNeoForCausalLM, GPT2Tokenizer

# gpt 2 medium used for testing because I don't need to manually
# install a bin file containing a pre-trained model

app = Flask(__name__)
CORS(app)

# Load pre-trained GPT-2 model and tokenizer
model_name = "EleutherAI/gpt-neo-1.3B"
model = GPTNeoForCausalLM.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)


@app.route("/api/ask", methods=["POST"])
def ask():
    question = request.json.get("question")
    response = generate_response(question)
    return jsonify({"response": response})


def generate_response(prompt):
    input_ids = tokenizer.encode(prompt, return_tensors="pt")
    output = model.generate(
        input_ids,
        max_length=150,
        num_return_sequences=1,
        pad_token_id=tokenizer.eos_token_id,
    )
    response = tokenizer.decode(output[0], skip_special_tokens=True)
    return response


if __name__ == "__main__":
    app.run(debug=True, port=5000)
