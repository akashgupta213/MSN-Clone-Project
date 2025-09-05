import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api";
import "./AdminFeatures.css";

export default function EditNews({ darkMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await API.get(`/news/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setImage(res.data.image ? `http://localhost:5000${res.data.image}` : null);
      } catch {
        setMessage("❌ Failed to load news");
      }
    };
    fetchNews();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image && typeof image !== "string") formData.append("image", image);

      const token = localStorage.getItem("token");
      await API.put(`/news/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("✅ News updated successfully!");
      navigate("/adminpanel/edit");
    } catch {
      setMessage("❌ Failed to update news");
    }
  };

  return (
    <div className={`feature-wrapper ${darkMode ? "dark-mode" : ""}`}>
      <div className="feature-container card-background">
        <h2 className="feature-title">✏️ Edit News</h2>

        {message && (
          <p className={`feature-message ${message.includes("✅") ? "success" : "error"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleEdit} className="feature-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="feature-input"
            placeholder="Enter title"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="feature-textarea"
            placeholder="Enter content"
            required
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="feature-input"
          />

          {image && (
            <div className="feature-image-wrapper">
              <img
                src={typeof image === "string" ? image : URL.createObjectURL(image)}
                alt="preview"
                className="feature-preview-image"
              />
            </div>
          )}

          <button type="submit" className="feature-button">
            Update News
          </button>
        </form>
      </div>
    </div>
  );
}
