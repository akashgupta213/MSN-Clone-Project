
import { Link, Outlet } from "react-router-dom";
import "./AdminPanel.css";

export default function AdminPanel() {
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    window.location.href = "/";        
  };

  return (
    <div className="admin-container">

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

      
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
