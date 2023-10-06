from dotenv import load_dotenv
import openai
import os
from langchain.embeddings import HuggingFaceBgeEmbeddings
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS     

# This is temporary until we get an open-source llm
load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

# Open-source embeddings model
# TODO -> need to integrate 
model_name = "BAAI/bge-small-en" 
model_kwargs = {'device': 'cpu'}
encode_kwargs = {'normalize_embeddings': False}

hf = HuggingFaceBgeEmbeddings(
    model_name=model_name,
    model_kwargs=model_kwargs,
    encode_kwargs=encode_kwargs
)

def get_text_embeddings(chunks):
    """
    Generate text embeddings for each text chunk using OpenAI Embeddings.

    • texts: The text chunks obtained after splitting the raw text.
    • returns: A FAISS object for similarity search among the text embeddings.
    """
    embeddings = OpenAIEmbeddings() # Swap with open-source model
    return FAISS.from_texts(chunks, embeddings)

def search_embeddings(embeddings, query: str):
    """
    Search for sections of the document that are 'similar' or relevant to the query.

    • document_search: The FAISS object containing text embeddings.
    • query: The user's query for the question-answering model.
    • returns: Relevant document sections for the query.
    """
    relevant_documents = embeddings.similarity_search(query)
    return relevant_documents
