from pdf_processing import extract_text_from_pdf, split_text
from embedding import get_text_embeddings, search_embeddings
from question_answering import run_qa_chain

 # Extract text from the PDF
raw_text = extract_text_from_pdf('pdf_text/syllabus.pdf')
print(f'Size of text: {len(raw_text)}')

# Split the extracted text into chunks
chunks = split_text(raw_text)
print(f'Size of chunks: {len(chunks)}')

# Generate embeddings and initialize the FAISS object for similarity search
embeddings = get_text_embeddings(chunks)
print('\n\n')
print(embeddings)

# Define the query and search for relevant document sections
query = 'What date is the first exam?'
documents = search_embeddings(embeddings, query)

# Run the QA chain to get the response for the query
response = run_qa_chain(documents, query)
print(response) 
