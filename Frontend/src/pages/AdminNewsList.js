import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminNewsList() {
  const [newsList, setNewsList] = useState([]);

  // Fetch all news items
  const fetchNews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/news");
      setNewsList(res.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this news?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/news/${id}`);
      alert("News deleted successfully");
      fetchNews(); // Refresh the list after deletion
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete news");
    }
  };

  return (
    <div>
      <h2>Admin News Panel</h2>
      {newsList.map((news) => (
        <div key={news._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <h3>{news.title}</h3>
          <p>{news.category}</p>
          <button onClick={() => handleDelete(news._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminNewsList;
