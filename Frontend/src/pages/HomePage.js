import React, { useEffect, useState } from "react";
import { getAllNews } from "../api/newsApi";
import NewsCard from "../components/NewsCard";

const HomePage = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    getAllNews().then(setNewsList).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Latest News</h1>
      {newsList.map(news => (
        <NewsCard key={news._id} news={news} />
      ))}
    </div>
  );
};

export default HomePage;
