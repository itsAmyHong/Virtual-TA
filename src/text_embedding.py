from langchain.embeddings import OpenAIEmbeddings
from langchain.embeddings import HuggingFaceEmbeddings, SentenceTransformerEmbeddings
from langchain.vectorstores import FAISS

#embeddings = OpenAIEmbeddings()
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

def embed_texts(chunks: list):
    """
    Generate text embeddings for each text chunk using OpenAI Embeddings.

    • chunks: The text chunks obtained after splitting the raw text.
    • returns: A FAISS object for similarity search among the text embeddings.
    """
    # Create a FAISS vector store from these embeddings
    text_embeddings = FAISS.from_texts(chunks, embeddings)
    return text_embeddings

def embed_query(query: str):
    embedded_query = embeddings.embed_query(query)
    return embedded_query

def search_texts(text_embeddings, query: str):
    """
    Search for sections of the document that are 'similar' or relevant to the query.

    • document_search: The FAISS object containing text embeddings.
    • query: The user's query for the question-answering model.
    • returns: Relevant document sections for the query.
    """
    relevant_texts = text_embeddings.similarity_search(query)
    return relevant_texts
