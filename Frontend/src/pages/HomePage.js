import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

function HomePage() {
  const [newsList, setNewsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(9); // Initial 9 cards for grid
  const [deleting, setDeleting] = useState(null);
  
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarks")) || []
  );

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_URL}/news`);
      // Sort newest first
      const sortedData = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setNewsList(sortedData);
    } catch (err) {
      setError("Failed to load news. Ensure backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200 // Threshold before bottom
      ) {
        setVisibleCount((prev) => prev + 6);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDelete = async (id) => {
    if (!userInfo) {
      alert("Please login to delete news.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this news?");
    if (!confirmDelete) return;

    try {
      setDeleting(id);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(`${API_URL}/news/${id}`, config);
      setNewsList(newsList.filter(n => n._id !== id));
    } catch (err) {
      console.error("Error deleting news:", err);
      alert(err.response?.data?.message || "Failed to delete news");
    } finally {
      setDeleting(null);
    }
  };

  const toggleBookmark = (id) => {
    const updated = bookmarks.includes(id)
      ? bookmarks.filter((b) => b !== id)
      : [...bookmarks, id];
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  const categories = [...new Set(newsList.map((news) => news.category).filter(Boolean))];

  const filteredNews = newsList
    .filter((news) => news.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((news) => categoryFilter === "All" || news.category === categoryFilter);

  const heroNews = filteredNews.length > 0 ? filteredNews[0] : null;
  const gridNews = filteredNews.slice(heroNews ? 1 : 0, visibleCount);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onSearch={setSearchTerm} 
        categories={categories}
        onCategoryChange={setCategoryFilter}
        currentCategory={categoryFilter}
      />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg text-center mb-8">
            {error}
          </div>
        )}

        {!loading && !error && filteredNews.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-500 dark:text-gray-400">No news found for your search.</h2>
          </div>
        )}

        {/* Hero Section for Top Story */}
        {!loading && heroNews && categoryFilter === "All" && searchTerm === "" && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Top Story</h2>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group h-[400px] md:h-[500px]">
              {heroNews.image ? (
                <img 
                  src={heroNews.image.startsWith('http') ? heroNews.image : `http://localhost:5000/${heroNews.image}`} 
                  alt={heroNews.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/1200x600?text=Top+Story' }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-800"></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-12">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide w-max mb-4">
                  {heroNews.category || 'Breaking'}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-blue-300 transition-colors">
                  <a href={`/news/${heroNews._id}`}>{heroNews.title}</a>
                </h1>
                <p className="text-gray-300 md:text-lg max-w-3xl line-clamp-2 md:line-clamp-3 mb-6">
                  {heroNews.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>{new Date(heroNews.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <button onClick={() => toggleBookmark(heroNews._id)} className="hover:text-white transition-colors text-lg">
                    {bookmarks.includes(heroNews._id) ? '🔖 Saved' : '🤍 Save'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* News Grid */}
        {!loading && gridNews.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {categoryFilter !== "All" ? `${categoryFilter} News` : searchTerm ? 'Search Results' : 'Latest Stories'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {gridNews.map((news) => (
                <NewsCard 
                  key={news._id} 
                  news={news} 
                  userInfo={userInfo} 
                  deleting={deleting} 
                  handleDelete={handleDelete} 
                  toggleBookmark={toggleBookmark}
                  isBookmarked={bookmarks.includes(news._id)}
                />
              ))}
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-[#1e1e1e] border-t border-gray-200 dark:border-gray-800 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} MSN Clone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
