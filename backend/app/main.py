from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
import ollama
import faiss
import shutil
import os


app = FastAPI()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

vector_store = None
stored_chunks = []


@app.get("/")
def home():
    return {"message": "Backend running successfully"}


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    global vector_store, stored_chunks

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    reader = PdfReader(file_path)

    extracted_text = ""

    for page in reader.pages:
        extracted_text += page.extract_text()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=150
    )

    chunks = splitter.split_text(extracted_text)

    embeddings = embedding_model.encode(chunks)

    dimension = embeddings.shape[1]

    vector_store = faiss.IndexFlatL2(dimension)
    vector_store.add(embeddings)

    stored_chunks = chunks

    return {
        "message": "PDF embedded successfully",
        "total_chunks": len(chunks)
    }


@app.post("/chat")
async def chat(question: dict):
    try:
        if vector_store is None:
            return {"answer": "Please upload a PDF first"}

        query = question["question"]

        query_embedding = embedding_model.encode([query])

        distances, indices = vector_store.search(query_embedding, k=3)

        best_match = "\n".join(
            [stored_chunks[i] for i in indices[0]]
        )

        prompt = f"""
        You are a PDF question-answer assistant.

        Answer ONLY from the provided context.

        If the answer is not found in the context, say:
        "I could not find that information in the PDF."

        Context:
        {best_match}

        Question:
        {query}
        """

        response = ollama.chat(
            model="phi3",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            options={
                "num_predict": 120
            }
        )

        return {
            "answer": response["message"]["content"]
        }

    except Exception as e:
        print("OLLAMA ERROR:", e)

        return {
            "answer": f"Error: {str(e)}"
        }
