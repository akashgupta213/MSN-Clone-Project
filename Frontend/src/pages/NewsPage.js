import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsById } from "../api/newsApi";

const NewsPage = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    getNewsById(id).then(setNews).catch(console.error);
  }, [id]);

  if (!news) return <p>Loading...</p>;

  return (
    <div>
      <h2>{news.title}</h2>
      <p>{news.content}</p>
    </div>
  );
};

export default NewsPage;
