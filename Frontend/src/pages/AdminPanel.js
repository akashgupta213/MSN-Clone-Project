// src/pages/AdminPanel.js
import { Link, Outlet } from "react-router-dom";
import "./AdminPanel.css";

export default function AdminPanel() {
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    window.location.href = "/";        // redirect to homepage/login
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h4 className="admin-title">⚙️ Admin</h4>
        <nav>
          <Link to="add" className="nav-link">
            ➕ Add News
          </Link>
          <Link to="edit" className="nav-link">
            ✏️ Edit News
          </Link>
          <Link to="delete" className="nav-link">
            🗑️ Delete News
          </Link>
          <Link to="manage" className="nav-link">
            📋 Manage News
          </Link>
          <button className="btn-logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="admin-content">
        <Outlet /> {/* Nested routes render here */}
      </div>
    </div>
  );
}
