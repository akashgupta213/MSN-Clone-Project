import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [newsList, setNewsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [role, setRole] = useState("admin"); // mock role for now
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarks")) || []
  );

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/news");
        setNewsList(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        setVisibleCount((prev) => prev + 5);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [...new Set(newsList.map(news => news.category).filter(Boolean))];

  const filteredNews = newsList.filter(news =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredByCategory = filteredNews.filter(news =>
    categoryFilter === "All" || news.category === categoryFilter
  );

  const visibleNews = filteredByCategory.slice(0, visibleCount);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this news?")) {
      try {
        await axios.delete(`http://localhost:5000/api/news/${id}`);
        setNewsList(newsList.filter((news) => news._id !== id));
      } catch (err) {
        console.error("Error deleting news:", err);
      }
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const toggleBookmark = (id) => {
    let updated;
    if (bookmarks.includes(id)) {
      updated = bookmarks.filter(bid => bid !== id);
    } else {
      updated = [...bookmarks, id];
    }
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  return (
    <div style={{
      padding: "20px",
      backgroundColor: darkMode ? "#121212" : "#fff",
      color: darkMode ? "#f1f1f1" : "#000",
      minHeight: "100vh"
    }}>
      <button onClick={toggleDarkMode} style={{ marginBottom: "15px" }}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h2>📰 Latest News</h2>

      <input
        type="text"
        placeholder="Search news by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "15px",
          width: "100%",
          maxWidth: "400px"
        }}
      />

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px", display: "block" }}
      >
        <option value="All">All Categories</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>{cat}</option>
        ))}
      </select>

      {loading && <p>Loading news...</p>}
      {!loading && visibleNews.length === 0 && <p>No news found.</p>}

      {visibleNews.map((news) => (
        <div key={news._id} style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          backgroundColor: darkMode ? "#1e1e1e" : "#fafafa"
        }}>
          {news.image && (
            <img
              src={news.image}
              alt="News"
              style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
            />
          )}
          <h3>{news.title}</h3>
          <p>Category: {news.category}</p>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Link to={`/news/${news._id}`}>Read More</Link>
            {role === "admin" && (
              <>
                <Link to={`/admin/edit/${news._id}`}>Edit</Link>
                <button onClick={() => handleDelete(news._id)}>Delete</button>
              </>
            )}
            <button onClick={() => toggleBookmark(news._id)}>
              {bookmarks.includes(news._id) ? "🔖 Bookmarked" : "🔖 Bookmark"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
