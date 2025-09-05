// src/components/NewsCard.js

import { Link } from "react-router-dom";

export default function NewsCard({ article }) {
  // Use optional chaining for safe access
  const image = article.urlToImage;
  const title = article.title;
  const description = article.description;
  const source = article.source.name;
  const url = article.url;

  return (
    <div className="card h-100 shadow-sm border-0 hover-shadow">
      {image && (
        <img
          src={image}
          className="card-img-top"
          alt={title}
          style={{ height: "200px", objectFit: "cover" }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold">{title}</h5>
        <p className="card-text text-muted">
          {description ? description.substring(0, 100) : "No description available."}...
        </p>
        <div className="mt-auto">
          <a
            href={url}
            className="btn btn-outline-primary btn-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Full Story
          </a>
        </div>
      </div>
      <div className="card-footer bg-light text-muted small">
        Source: {source}
      </div>
    </div>
  );
}