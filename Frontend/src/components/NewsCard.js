import React from 'react';
import { Link } from 'react-router-dom';

const NewsCard = ({ news, userInfo, deleting, handleDelete, toggleBookmark, isBookmarked }) => {
  const isAuthor = userInfo && news.author && userInfo._id === news.author;

  return (
    <div className="group flex flex-col bg-white dark:bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        {news.image ? (
          <img
            src={news.image.startsWith('http') ? news.image : `http://localhost:5000/${news.image}`}
            alt={news.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x250?text=News' }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500">No Image</span>
          </div>
        )}
        
        {/* Category Badge */}
        {news.category && (
          <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
            {news.category}
          </div>
        )}
        
        {/* Bookmark Button */}
        <button 
          onClick={(e) => { e.preventDefault(); toggleBookmark(news._id); }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-black transition-colors shadow-sm"
        >
          {isBookmarked ? '🔖' : '🤍'}
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2 space-x-2">
          <span>{new Date(news.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span>•</span>
          <span>5 min read</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <Link to={`/news/${news._id}`}>{news.title}</Link>
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4 flex-grow">
          {news.description || 'No description available for this article.'}
        </p>

        {/* Footer Actions */}
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <Link 
            to={`/news/${news._id}`}
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center"
          >
            Read Full Story <span className="ml-1">→</span>
          </Link>

          {isAuthor && (
            <div className="flex space-x-3">
              <button
                onClick={() => handleDelete(news._id)}
                disabled={deleting === news._id}
                className="text-sm text-red-500 hover:text-red-700 disabled:opacity-50"
              >
                {deleting === news._id ? '...' : 'Delete'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
