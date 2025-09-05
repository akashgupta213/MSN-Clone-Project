// src/pages/admin/EditNewsList.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import "./AdminFeatures.css";

export default function EditNewsList() {
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

  if (loading) return <p className="feature-message">Loading news...</p>;

  return (
    <div className="feature-wrapper">
      <div className="feature-container">
        <h2 className="feature-title">✏️ Edit News</h2>

        {newsList.length === 0 ? (
          <p className="feature-message">No news found.</p>
        ) : (
          <div className="news-grid">
            {newsList.map((news) => (
              <div key={news._id} className="news-card">
                <strong>{news.title}</strong>
                <p>{news.content}</p>
                {news.image && (
                  <img
                    src={`http://localhost:5000${news.image}`}
                    alt={news.title}
                    className="news-image"
                  />
                )}
                <div className="news-actions">
                  <button
                    className="feature-button"
                    onClick={() => navigate(`/adminpanel/edit/${news._id}`)}
                  >
                    ✏️ Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
          
        )}
      </div>
    </div>
  );
}
