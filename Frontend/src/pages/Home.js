import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import "./Home.css";
import Spinner from "../components/Spinner";

export default function Home() {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const category = (categoryName || "general").toLowerCase(); // ensure lowercase for NewsAPI
  const API_KEY = "1689a1d1e7924c429574360b148f6aa8";
  const PAGE_SIZE = 10;

  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Reset page to 1 when category changes
  useEffect(() => {
    setPage(1);
  }, [category]);

  // Fetch news whenever category or page changes
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${PAGE_SIZE}&page=${page}&apiKey=${API_KEY}`
        );
        const data = await response.json();

        if (data.status === "ok") {
          setNews(data.articles);
          setTotalResults(data.totalResults);
        } else {
          setNews([]);
          setTotalResults(0);
          console.error("News API error:", data.message);
        }
      } catch (err) {
        console.error("Failed to fetch news from API", err);
        setNews([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, page]);

  const handleCategoryChange = (e) => {
    navigate(`/category/${e.target.value.toLowerCase()}`);
  };

  const handleNextPage = () => {
    if (page * PAGE_SIZE < totalResults) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

    if (loading) return <Spinner />;
  return (
    <div className="container mt-4">
      {/* Search and Category Filter */}
      <div className="search-filter-section mb-4 d-flex flex-column flex-md-row gap-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-select"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="general">General</option>
          <option value="sports">Sports</option>
          <option value="politics">Politics</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
        </select>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* News Grid */}
          <div className="news-grid-container">
            {filteredNews.length > 0 ? (
              filteredNews.map((item, index) => (
                <NewsCard key={index} article={item} />
              ))
            ) : (
              <div className="col-12 text-center my-5">
                <p>No news articles found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="pagination-buttons d-flex justify-content-between my-5">
            <button
              className="btn btn-primary"
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              &larr; Previous
            </button>
            <button
              className="btn btn-primary"
              onClick={handleNextPage}
              disabled={page * PAGE_SIZE >= totalResults || totalResults === 0}
            >
              Next &rarr;
            </button>
          </div>
        </>
      )}
    </div>
  );
}
