
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
    localStorage.removeItem("token"); 
    setToken(null);                    
    navigate("/login");                
  };

  return (
    <nav className="custom-navbar">
     
      <div className="nav-section left">
        <Link to={token ? "/home" : "/register"} className="nav-logo">
          📰 NewsNova
        </Link>
        {token && <Link to="/home" className="nav-link">Home</Link>}
      </div>

     
      <div className="nav-section center">
        <button
          className="mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      
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
            <Link to="/adminpanel" className="nav-button nav-button-logout">
              Admin Panel
            </Link>
            <button
              onClick={handleLogout}
              className="nav-button nav-button-logout"
            >
               Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
