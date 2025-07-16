import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
  return (
    <div className="news-card">
      <h2>{news.title}</h2>
      <p>{news.summary}</p>
      <Link to={`/news/${news._id}`}>Read More</Link>
    </div>
  );
};

export default NewsCard;
