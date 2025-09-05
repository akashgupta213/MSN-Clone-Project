import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import AddNews from "./pages/admin/AddNews";
import ManageNews from "./pages/admin/ManageNews";
import EditNews from "./pages/admin/EditNews";
import DeleteNews from "./pages/admin/DeleteNews";
import EditNewsList from "./pages/admin/EditNewsList";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Router>
        <Navbar
          token={token}
          setToken={setToken}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <Routes>
          <Route path="/" element={<Navigate to="/category/general" />} />

          <Route path="/register" element={<Register darkMode={darkMode} />} />
          <Route
            path="/login"
            element={<AdminLogin setToken={setToken} darkMode={darkMode} />}
          />

          <Route
            path="/home"
            element={
              token ? (
                <Navigate to="/category/general" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/category/:categoryName"
            element={
              token ? <Home darkMode={darkMode} /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/adminpanel"
            element={
              token ? (
                <AdminPanel darkMode={darkMode} />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route path="add" element={<AddNews darkMode={darkMode} />} />
            <Route path="manage" element={<ManageNews darkMode={darkMode} />} />
            <Route path="edit/:id" element={<EditNews darkMode={darkMode} />} />
            <Route path="edit" element={<EditNewsList darkMode={darkMode} />} />
            <Route path="delete" element={<DeleteNews darkMode={darkMode} />} />
            <Route
              index
              element={
                <h2 className="feature-message">
                  Welcome, Admin 👋
                  <div style={{ maxWidth: "700px", margin: "0 auto" }}>
                    <p
                      style={{
                        fontStyle: "italic",
                        fontFamily: "Georgia, serif",
                        fontSize: "0.95rem",
                        color: darkMode ? "#fff" : "#4f3c3cff",
                        textAlign: "center",
                        lineHeight: "1.5",
                      }}
                    >
                      The Admin Panel provides complete control over the
                      platform, allowing administrators to manage content,
                      monitor user activity, and update settings efficiently.
                      From adding, editing, or deleting news and articles to
                      overseeing system operations, this panel ensures smooth
                      management and easy access to all essential features in
                      one place.
                    </p>
                  </div>
                </h2>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
