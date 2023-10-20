import os
from dotenv import load_dotenv
import openai
from process_text import extract_text_from_pdf, split_text
from embed_text import get_text_embeddings, search_embeddings
from text_qa import run_qa_chain

def main():
    # Load environment variables
    load_dotenv()
    openai.api_key = os.getenv('OPENAI_API_KEY')
    os.environ['TOKENIZERS_PARALLELISM'] = 'false'

    # Define file path and query
    file_path = 'texts/syllabus.pdf'
    query = 'When are the exams?'

    # Extract and chunk text from PDF
    raw_text = extract_text_from_pdf(file_path)
    chunks = split_text(raw_text)

    # Generate embeddings and initialize the FAISS object for similarity search
    vector_store = get_text_embeddings(chunks)

    # Search for relevant document sections and run QA chain
    relevant_documents = search_embeddings(vector_store, query)
    response = run_qa_chain(relevant_documents, query)

    print(response)

if __name__ == "__main__":
    main()
