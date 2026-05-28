# AI PDF Chatbot 🤖📄

![Python](https://img.shields.io/badge/Python-3.12-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-38B2AC)
![Ollama](https://img.shields.io/badge/Ollama-LocalLLM-black)
![Phi3](https://img.shields.io/badge/Phi3-Microsoft-orange)
![FAISS](https://img.shields.io/badge/FAISS-VectorDB-red)
![SentenceTransformers](https://img.shields.io/badge/SentenceTransformers-Embeddings-yellowgreen)
![RAG](https://img.shields.io/badge/RAG-PDFChatbot-purple)
![Deployment](https://img.shields.io/badge/Deployment-Local-success)

An AI-powered PDF chatbot built using React, FastAPI, FAISS, Sentence Transformers, and Ollama.

Upload PDFs and ask questions using local LLMs like Phi3 for fast offline document understanding.

---

## 🚀 Features

* Upload PDF documents
* Extract text from PDFs
* Semantic search using FAISS
* AI-powered question answering
* Local LLM integration using Ollama
* FastAPI backend
* React + Tailwind frontend
* Responsive modern UI
* Loading spinner while generating answers
* Fully offline AI support using Phi3

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* Vite

### Backend

* FastAPI
* Python
* FAISS
* Sentence Transformers
* PyPDF
* Ollama
* Phi3 Model

---

## 📂 Project Structure

```bash
ai-pdf-chatbot/
│
├── backend/
│   ├── app/
│   ├── uploads/
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── .gitignore
├── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-pdf-chatbot.git
cd ai-pdf-chatbot
```

---

### 2️⃣ Backend Setup

```bash
cd backend
python -m venv venv
```

### Activate Virtual Environment

#### Windows

```bash
venv\Scripts\activate
```

#### Mac/Linux

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 3️⃣ Install Ollama

Download Ollama:

https://ollama.com

Pull Phi3 model:

```bash
ollama pull phi3
```

---

### 4️⃣ Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

### 5️⃣ Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 🧠 How It Works

1. User uploads a PDF
2. Backend extracts text
3. Text is split into chunks
4. Embeddings are generated
5. FAISS stores vector embeddings
6. User asks a question
7. Similar chunks are retrieved
8. Phi3 generates contextual answers

---

## 📸 Screenshots

<img width="1175" height="992" alt="image" src="https://github.com/user-attachments/assets/87f38e03-4e80-412c-841d-905250849339" />
<img width="949" height="985" alt="image" src="https://github.com/user-attachments/assets/682a3542-c7b7-40be-bb91-45c1755ebb62" />
<img width="1004" height="991" alt="image" src="https://github.com/user-attachments/assets/a09b3246-418c-4ac6-b28f-0fea8a73018a" />
<img width="1225" height="989" alt="image" src="https://github.com/user-attachments/assets/fd6ad524-bbf8-4541-bed5-112af59a223c" />



---

## 🔥 Future Improvements

* Chat history
* Multiple PDF support
* Streaming responses
* Authentication
* PDF summarization
* Deploy to cloud
* Drag & drop upload
* Voice support

---

## 👨‍💻 Author

### Siva Priyanka Medisetty

GitHub:
https://github.com/sivapriyanka-dev

---

## ⭐ Support

If you like this project, give it a star on GitHub ⭐
