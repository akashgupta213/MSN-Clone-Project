import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Auth.css";

export default function AdminLogin({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token); // ✅ now works
      navigate("/home");         // fixed extra space
    } catch (err) {
      console.log(err.response?.data);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h3 className="text-center mb-4">🔐 Admin Login</h3>
        {error && <div className="alert alert-danger auth-alert">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-dark w-100">Login</button>
        </form>
      </div>
    </div>
  );
}
