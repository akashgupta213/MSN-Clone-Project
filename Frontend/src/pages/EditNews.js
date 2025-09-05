import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function EditNews() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);

  // Load existing news
  useEffect(() => {
    API.get(`/news/${id}`).then((res) => {
      const n = res.data;
      setTitle(n.title);
      setContent(n.content);
      setCategory(n.category);
      setAuthor(n.author);
    });
  }, [id]);

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { title, content, category, author };
      await API.put(`/news/${id}`, updatedData);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error updating news");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h2 className="mb-4">Edit News</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              className="form-control"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              type="text"
              className="form-control"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <button className="btn btn-warning w-100">Update News</button>
        </form>
      </div>
    </div>
  );
}
