import React, { useEffect, useRef, useState } from "react";
import api from "../services/api";

const PDFUploader = () => {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfUploaded, setPdfUploaded] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/upload", formData);

      setUploadStatus(`PDF processed into ${res.data.total_chunks} chunks`);

      setPdfUploaded(true);

      setMessages([
        {
          role: "assistant",
          content:
            "PDF uploaded successfully. Ask anything from your document.",
        },
      ]);
    } catch (error) {
      console.error(error);
      setUploadStatus("Upload failed");
    }
  };

  const askQuestion = async () => {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const res = await api.post("/chat", {
        question,
      });

      const aiMessage = {
        role: "assistant",
        content: res.data.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);

      setQuestion("");
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen max-w-[1600px] mx-auto flex flex-col lg:flex-row bg-[#f3f4f6]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* SIDEBAR */}

      <div className="w-full lg:w-72 bg-[#050816] text-white flex flex-col justify-between p-4 md:p-6 lg:h-screen">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-xl">
              ✨
            </div>

            <h1 className="text-xl md:text-2xl font-bold">AI PDF Chat</h1>
          </div>

          <label className="block">
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <div className="bg-indigo-600 hover:bg-indigo-700 transition rounded-2xl p-3 md:p-4 cursor-pointer text-center font-semibold text-sm md:text-base">
              + Upload new PDF
            </div>
          </label>

          <div className="mt-6 border-t border-gray-800 pt-6">
            <p className="text-gray-500 break-words text-sm md:text-base">
              {file ? file.name : "No documents yet"}
            </p>
          </div>
        </div>

        <div className="mt-10 md:mt-0">
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-500 text-sm font-bold mb-4">TRY ASKING</p>

            <div className="space-y-3 text-gray-400 text-sm">
              <p>• Summarize this document</p>
              <p>• What are the key findings?</p>
              <p>• Extract action items</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 lg:px-16">
        {!pdfUploaded ? (
          <div className="w-full max-w-6xl flex flex-col items-center">
            {/* UPLOAD CARD */}

            <div className="w-full max-w-3xl border-2 border-dashed border-gray-300 rounded-3xl bg-white p-8 md:p-14 text-center shadow-md">
              <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-8 text-5xl">
                📄
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Upload a PDF to get started
              </h2>

              <p className="text-gray-500 text-sm md:text-lg leading-relaxed mt-4">
                Drag & drop a PDF file here, or click to browse.
                <br />
                Ask questions, get summaries, extract insights.
              </p>

              <button
                onClick={handleUpload}
                className="mt-8 bg-indigo-600 hover:bg-indigo-700 transition text-white px-8 py-4 rounded-2xl text-lg font-semibold"
              >
                Choose PDF file
              </button>

              <p className="text-gray-400 mt-6">PDF files only · Max 50MB</p>

              {uploadStatus && (
                <p className="mt-4 text-green-600 font-medium">
                  {uploadStatus}
                </p>
              )}
            </div>

            {/* FEATURE CARDS */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8 w-full max-w-3xl">
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                <h3 className="font-bold text-lg mb-2">Summarize</h3>

                <p className="text-gray-500">Get the gist instantly</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                <h3 className="font-bold text-lg mb-2">Q&A</h3>

                <p className="text-gray-500">Ask anything</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                <h3 className="font-bold text-lg mb-2">Extract</h3>

                <p className="text-gray-500">Pull out key data</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-6xl mx-auto flex flex-col h-[90vh]">
            {/* CHAT AREA */}

            <div className="bg-white rounded-3xl shadow-lg flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-full md:max-w-3xl p-5 rounded-3xl ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-black"
                    }`}
                  >
                    <p className="font-bold mb-2 text-sm">
                      {msg.role === "user" ? "You" : "AI"}
                    </p>

                    <p className="leading-relaxed whitespace-pre-wrap break-words">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>

                  <p className="text-gray-500">AI is thinking...</p>
                </div>
              )}

              <div ref={bottomRef}></div>
            </div>

            {/* INPUT AREA */}

            <div className="mt-6 bg-white rounded-3xl shadow-lg p-4 flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Ask anything about your PDF..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    askQuestion();
                  }
                }}
                className="flex-1 p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
              />

              <button
                onClick={askQuestion}
                disabled={loading}
                className={`px-8 py-4 md:py-0 rounded-2xl text-white font-semibold transition ${
                  loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {loading ? "Thinking..." : "Send"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFUploader;
