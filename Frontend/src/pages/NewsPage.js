import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getNewsById } from "../api/newsApi";

const NewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getNewsById(id)
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load the article.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#121212] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#121212] flex flex-col justify-center items-center p-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{error || "Article not found"}</h2>
        <button onClick={() => navigate("/")} className="text-blue-600 hover:underline">
          &larr; Go back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] transition-colors duration-300 pb-16">
      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <button onClick={() => navigate("/")} className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to News
        </button>

        {news.category && (
          <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
            {news.category}
          </span>
        )}
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
          {news.title}
        </h1>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
          <span>{new Date(news.createdAt || Date.now()).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span className="mx-2">•</span>
          <span>5 min read</span>
        </div>
      </div>

      {/* Featured Image */}
      {news.image && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <img
            src={news.image.startsWith('http') ? news.image : `http://localhost:5000/${news.image}`}
            alt={news.title}
            className="w-full h-[400px] md:h-[600px] object-cover rounded-2xl shadow-lg"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg dark:prose-invert prose-blue max-w-none text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
          {news.description}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
