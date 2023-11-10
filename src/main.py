import os
from dotenv import load_dotenv
import openai
from text_processing import extract_text_from_pdf, split_text
from text_embedding import embed_texts, embed_query, search_texts
from text_chat import text_chat

def main():
    # Load environment variables
    load_dotenv()
    openai.api_key = os.getenv('OPENAI_API_KEY')    
    os.environ['TOKENIZERS_PARALLELISM'] = 'false'

    # Define file path and query
    file_path = 'texts/syllabus.pdf'
    query = "What topics are covered in the class schedule?" 

    # Extract and chunk text from PDF
    raw_text = extract_text_from_pdf(file_path=file_path) # Type(str); 9445 characters
    chunks = split_text(raw_text=raw_text) # Type(list); length = 53

    # Generate text embeddings and initialize the FAISS object for similarity search
    text_embeddings = embed_texts(chunks=chunks) # Type(<class 'langchain.vectorstores.faiss.FAISS'>); Location(<langchain.vectorstores.faiss.FAISS object at 0x...>)

    # Search the text embeddings for chunks relevent to the user's query
    relevant_texts = search_texts(text_embeddings=text_embeddings, query=query)

    # Feed the relevant texts into the language model for a polished response
    response = text_chat(relevant_texts=relevant_texts, query=query)

    print(response)

if __name__ == "__main__":
    main()
