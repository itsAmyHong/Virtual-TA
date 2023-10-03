from PyPDF2 import PdfReader # Use Case: To read PDF files
from langchain.text_splitter import CharacterTextSplitter 

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

    # chunk_size defines the maximum number of characters per chunk
    # chunk_overlap defines the maximum number of overlapping characters between chunks
    # length_function defines how the number of characters per chunk will be counted.
    text_splitter = CharacterTextSplitter(separator="\n", chunk_size=50, chunk_overlap=0, length_function=len)
    return text_splitter.split_text(raw_text)
