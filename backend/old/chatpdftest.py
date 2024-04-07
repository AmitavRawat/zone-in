import openai
import numpy as np
import faiss  # Make sure to install faiss-cpu or faiss-gpu
from langchain.document_loaders import PyPDFLoader

openai.api_key = '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'

# Function to extract text from PDF and create chunks
def process_pdf(pdf_path):
    loader = PyPDFLoader(pdf_path)
    pages = loader.load_and_split()
    text_chunks = [{'content': page.page_content, 'page_num': page.metadata['page']} for page in pages]
    return text_chunks

# Function to create embeddings for text using OpenAI's API
def create_embeddings(text_chunks):
    embeddings = []
    page_nums = []
    for chunk in text_chunks:
        response = openai.Embedding.create(
            input=chunk['content'],
            model="text-similarity-babbage-001"
        )
        embedding = response['data'][0]['embedding']
        embeddings.append(embedding)
        page_nums.append(chunk['page_num'])
    return np.array(embeddings), page_nums

# Function to create and return a FAISS index
def create_faiss_index(embeddings):
    dimension = embeddings.shape[1]  # Get the dimension of the embeddings
    index = faiss.IndexFlatL2(dimension)  # Use the L2 norm for the distance metric
    index.add(embeddings)  # Add embeddings to the index
    return index

# Function to search for the most relevant document chunk using FAISS
def search_relevant_chunk_faiss(question_embedding, index):
    distances, indices = index.search(np.array([question_embedding]), k=1)
    return indices[0][0]  # Index of the closest vector

# Remaining functions (formulate_prompt, get_response_from_gpt) stay the same.

# Example usage
# Load your PDFs and process them
text_chunks = process_pdf('test.pdf')

# Create embeddings for each chunk and their corresponding page numbers
embeddings, page_nums = create_embeddings(text_chunks)

# Create a FAISS index for the embeddings
faiss_index = create_faiss_index(embeddings)

# New user question comes in
user_question = "How do I create an account?"

# Create embedding for the question
question_embedding = create_embeddings([{'content': user_question, 'page_num': None}])[0][0]  # Take the first embedding

# Search for the most relevant chunk using FAISS
relevant_chunk_index = search_relevant_chunk_faiss(question_embedding, faiss_index)
relevant_chunk = text_chunks[relevant_chunk_index]['content']
relevant_page_num = page_nums[relevant_chunk_index]

# Formulate the GPT-3.5 prompt
prompt = formulate_prompt(user_question, relevant_chunk)

# Get the response from GPT-3.5
response = get_response_from_gpt(prompt)

# Present the response to the user, including the page number
print(f"Relevant Page: {relevant_page_num}, Response: {response}")
