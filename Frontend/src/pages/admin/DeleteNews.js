
import { useEffect, useState } from "react";
import API from "../../api";
import "./AdminFeatures.css";

export default function DeleteNews() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");


  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await API.get("/news");
        setNewsList(res.data);
      } catch {
        setMessage("❌ Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news?")) return;
    try {
      await API.delete(`/news/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMessage("✅ News deleted successfully!");
      setNewsList(newsList.filter((news) => news._id !== id)); 
    } catch {
      setMessage("❌ Failed to delete news");
    }
  };

  if (loading) return <p className="feature-message">Loading news...</p>;

  return (
    <div className="feature-wrapper">
      <div className="feature-container">
        <h2 className="feature-title">🗑️ Delete News</h2>

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

        {newsList.length === 0 ? (
          <p className="feature-message">No news found.</p>
        ) : (
          <ul className="news-list">
            {newsList.map((news) => (
              <li key={news._id} className="news-item">
                <strong>{news.title}</strong>
                <p>{news.content}</p>
                {news.image && (
                  <img
                    src={`http://localhost:5000${news.image}`}
                    alt={news.title}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                )}
                <button
                  className="feature-button"
                  style={{ background: "#dc3545", marginTop: "5px" }}
                  onClick={() => handleDelete(news._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
