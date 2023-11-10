from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI

def text_chat(relevant_texts, query: str):
    """
    Execute the question-answering chain to get a response to the user's query based on the provided documents.

    • docs: The relevant document sections obtained from the similarity search.
    • query: The user's query for the question-answering model.
    • returns: The model's response to the query.
    """
    llm = OpenAI(temperature=0) # LLM of choice; swap out with Llama2
    chain = load_qa_chain(llm, chain_type="stuff")
    
    response = chain.run({'input_documents': relevant_texts, 'question': query})
    return response
