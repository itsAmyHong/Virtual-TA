from langchain.embeddings import HuggingFaceEmbeddings, SentenceTransformerEmbeddings
from langchain.vectorstores import FAISS

def get_text_embeddings(chunks):
    """
    Generate text embeddings for each text chunk using OpenAI Embeddings.

    • texts: The text chunks obtained after splitting the raw text.
    • returns: A FAISS object for similarity search among the text embeddings.
    """
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    vector_store = FAISS.from_texts(chunks, embeddings)
    return vector_store

def search_embeddings(vector_store, query: str):
    """
    Search for sections of the document that are 'similar' or relevant to the query.

    • document_search: The FAISS object containing text embeddings.
    • query: The user's query for the question-answering model.
    • returns: Relevant document sections for the query.
    """
    relevant_documents = vector_store.similarity_search(query)
    return relevant_documents
