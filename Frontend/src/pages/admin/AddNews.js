// src/pages/admin/AddNews.js
import { useState } from "react";
import API from "../../api";
import "./AdminFeatures.css";

export default function AddNews() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!title || !content) {
    setMessage("⚠️ Title and Content are required!");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  if (image) {
    formData.append("image", image);
  }

  try {
    await API.post("/news", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setMessage("✅ News added successfully!");
    setTitle("");
    setContent("");
    setImage(null);
  } catch (err) {
    console.error("❌ AddNews Error:", err.response?.data || err.message);
    setMessage("❌ Error adding news");
  }
};

  return (
    <div className="feature-wrapper">
      <div className="feature-container">
        <h2 className="feature-title">➕ Add News</h2>
        {message && (
          <p
            className={`feature-message ${
              message.includes("✅")
                ? "success"
                : message.includes("❌")
                ? "error"
                : ""
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="feature-form">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="feature-input"
          />
          <textarea
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="feature-textarea"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="feature-input"
          />
          <button type="submit" className="feature-button">
            Add News
          </button>
        </form>
      </div>
    </div>
  );
}
