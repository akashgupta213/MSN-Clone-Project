import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    API.get(`/news/${id}`)
      .then((res) => setNews(res.data))
      .catch(() =>
        setNews({
          title: "Sample News",
          content: "This is dummy news because backend is offline.",
          category: "General",
          author: "Admin",
          image: null,
        })
      );
  }, [id]);

  if (!news) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="card border-0 shadow-sm">
        {news.image && (
          <img
            src={`http://localhost:5000${news.image}`}
            className="card-img-top"
            alt={news.title}
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        )}
        <div className="card-body">
          <h1 className="mb-3">{news.title}</h1>
          <span className="badge bg-primary">{news.category}</span>
          <span className="ms-3 text-muted">By {news.author}</span>
          <p className="mt-4 fs-5">{news.content}</p>
        </div>
      </div>
    </div>
  );
}
