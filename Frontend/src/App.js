import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

  return (
    <Router>
      <Navbar token={token} setToken={setToken} />
       
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/category/general" />} />
      
        {/* Authentication */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<AdminLogin setToken={setToken} />} />

        {/* Home / News Routes */}
        <Route path="/home" element={token ? <Navigate to="/category/general" /> : <Navigate to="/login" />} />
        <Route path="/category/:categoryName" element={token ? <Home /> : <Navigate to="/login" />} />

        {/* Admin Panel with nested routes */}
        <Route path="/adminpanel" element={token ? <AdminPanel /> : <Navigate to="/login" />}>
          <Route path="add" element={<AddNews />} />
          <Route path="manage" element={<ManageNews />} />
          <Route path="edit/:id" element={<EditNews />} />
          <Route path="edit" element={<EditNewsList />} />
          <Route path="delete" element={<DeleteNews />} />
          <Route index element={<h2 className="feature-message">Welcome, Admin 👋</h2>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
