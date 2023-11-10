from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter

def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract and concatenate text from all pages of the given PDF.

    • file_path: The file path of the PDF.
    • returns: A string containing all (unformatted) extracted text.
    """
    with open(file_path, 'rb') as file:
        pdfreader = PdfReader(file)
        raw_text = ''.join(page.extract_text() for page in pdfreader.pages if page.extract_text())
    return raw_text

def split_text(raw_text: str):
    """
    Split the extracted raw text into manageable chunks.

    • raw_text: The raw text extracted from the PDF.
    • returns: A list containing chunks of text.
    """
    text_splitter = RecursiveCharacterTextSplitter(
        #separator="\n",
        is_separator_regex = False,
        chunk_size=200, # The number of tokens per chunk
        chunk_overlap=20, # The number of tokens that overlap between chunks
        length_function=len # How the size of each chunk is measured
        )
    
    chunks = text_splitter.split_text(raw_text)
    return chunks
