// src/components/Navbar.js
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ token, setToken }) {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token from storage
    setToken(null);                    // update React state
    navigate("/login");                // redirect to login page
  };

  return (
    <nav className="custom-navbar">
      {/* Left Section */}
      <div className="nav-section left">
        <Link to={token ? "/home" : "/register"} className="nav-logo">
          📰 NewsPortal
        </Link>
        {token && <Link to="/home" className="nav-link">Home</Link>}
      </div>

      {/* Center Section */}
      <div className="nav-section center">
        <button
          className="mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Right Section */}
      <div className="nav-section right">
        {!token ? (
          <>
            <Link to="/register" className="nav-button nav-button-login">
              Register
            </Link>
            <Link to="/login" className="nav-button nav-button-login">
              Login
            </Link>
          </>
        ) : (
          <>
            <Link to="/adminpanel" className="nav-button nav-button-admin">
              Admin Panel
            </Link>
            <button
              onClick={handleLogout}
              className="nav-button nav-button-logout"
            >
              🚪 Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
