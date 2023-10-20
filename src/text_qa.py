from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
                           
def run_qa_chain(relevant_documents, query: str):
    """
    Execute the question-answering chain to get a response to the user's query based on the provided documents.

    • docs: The relevant document sections obtained from the similarity search.
    • query: The user's query for the question-answering model.
    • returns: The model's response to the query.
    """
    llm = OpenAI(temperature=2)
    chain = load_qa_chain(llm, chain_type="stuff")
    
    response = chain.run({'input_documents': relevant_documents, 'question': query})
    return response