from langchain.chains.question_answering import load_qa_chain   # Use Case: To prompt LLM with question
from langchain.llms import OpenAI                               # Use Case: LLM used to answer question
import openai

def run_qa_chain(documents, query: str):
    """
    Execute the question-answering chain to get a response to the user's query based on the provided documents.

    • docs: The relevant document sections obtained from the similarity search.
    • query: The user's query for the question-answering model.
    • returns: The model's response to the query.
    """
    chain = load_qa_chain(OpenAI(), chain_type="stuff")
    # Query Documents
    initial_answer = chain.run(input_documents=documents, question=query)

    # Enhance the answer with GPT-3
    prompt = f"The user asked: '{query}'\n\nThe initial answer is: '{initial_answer}'\n\n"

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages = [
            {"role": "system", "content": "You are a firendly teachers assistant"},
            {"role": "user", "content": ':Answer the following question "{prompt}"'}]
    )

    return response['choices'][0]['message']['content']
