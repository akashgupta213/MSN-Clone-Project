<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';
import AddBlog from './pages/BlogAdd';

function App() {
  return (
   <>
   <AddBlog/>
   </>
=======
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news/:id" element={<NewsPage />} />
      </Routes>
    </Router>
>>>>>>> 38e4aedd (Second Commit)
  );
}

export default App;
