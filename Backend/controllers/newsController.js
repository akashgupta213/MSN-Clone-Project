const News = require("../models/News");

exports.getAllNews = async (req, res) => {
  try {
    const newsList = await News.find().sort({ date: -1 });
    res.status(200).json(newsList);
  } catch (err) {
    res.status(500).json({ message: "Error fetching news", error: err.message });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) return res.status(404).json({ message: "News not found" });
    res.status(200).json(newsItem);
  } catch (err) {
    res.status(500).json({ message: "Error fetching news by ID", error: err.message });
  }
};
