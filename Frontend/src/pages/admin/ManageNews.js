import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import "./AdminFeatures.css";

export default function ManageNews() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNews = async () => {
    try {
      const res = await API.get("/news");
      setNewsList(res.data);
    } catch {
      console.error("❌ Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news?")) return;
    try {
      await API.delete(`/news/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("✅ News deleted successfully!");
      fetchNews(); // refresh list
    } catch {
      alert("❌ Failed to delete news");
    }
  };

  if (loading) return <p className="feature-message">Loading news...</p>;

  return (
    <div className="feature-wrapper">
      <div className="feature-container">
        <h2 className="feature-title">📋 Manage News</h2>
        {newsList.length === 0 ? (
          <p className="feature-message">No news found.</p>
        ) : (
          <ul className="news-list">
            {newsList.map((news) => (
              <li key={news._id} className="news-item">
                {news.image && (
                  <img
                    src={`http://localhost:5000${news.image}`}
                    alt={news.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                )}
                <strong>{news.title}</strong>
                <p>{news.content}</p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => navigate(`/adminpanel/edit/${news._id}`)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(news._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
