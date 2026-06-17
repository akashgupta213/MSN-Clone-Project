import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onSearch, categories, onCategoryChange, currentCategory }) => {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  useEffect(() => {
    // Check initial dark mode preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              MSN Clone
            </Link>
          </div>

          {/* Desktop Search & Filters (Optional based on props) */}
          <div className="hidden md:flex flex-1 items-center justify-center px-8">
            {onSearch && (
              <div className="w-full max-w-lg relative">
                <input
                  type="text"
                  placeholder="Search news..."
                  onChange={(e) => onSearch(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <svg className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {userInfo ? (
              <>
                <span className="text-sm text-gray-500 dark:text-gray-400">Hi, {userInfo.name}</span>
                <Link to="/add-blog" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                  Write Story
                </Link>
                <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-medium transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                Sign In
              </Link>
            )}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
             <button
              onClick={toggleDarkMode}
              className="p-2 mr-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Categories Bar (Desktop) */}
      {categories && categories.length > 0 && (
        <div className="hidden md:block border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex space-x-4 overflow-x-auto scrollbar-hide">
             <button
                onClick={() => onCategoryChange("All")}
                className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium transition-colors ${currentCategory === "All" ? "bg-blue-600 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
              >
                All News
              </button>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => onCategoryChange(cat)}
                className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium transition-colors ${currentCategory === cat ? "bg-blue-600 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1e1e1e]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {onSearch && (
               <input
                  type="text"
                  placeholder="Search news..."
                  onChange={(e) => onSearch(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md py-2 px-4 mb-2 focus:outline-none"
                />
             )}
             {userInfo ? (
              <>
                <Link to="/add-blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                  Write Story
                </Link>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                  Logout ({userInfo.name})
                </button>
              </>
             ) : (
               <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                  Sign In
               </Link>
             )}
            
            {/* Categories Mobile */}
             {categories && categories.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                   <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Categories</p>
                   <button
                      onClick={() => { onCategoryChange("All"); setIsMobileMenuOpen(false); }}
                      className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${currentCategory === "All" ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200" : "text-gray-700 dark:text-gray-300"}`}
                    >
                      All News
                    </button>
                  {categories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => { onCategoryChange(cat); setIsMobileMenuOpen(false); }}
                      className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${currentCategory === cat ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200" : "text-gray-700 dark:text-gray-300"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
             )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
