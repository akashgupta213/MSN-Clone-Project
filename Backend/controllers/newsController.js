const News = require("../models/News");
const Blog = require("../models/BlogAdd.model");

const blogAdd = async (req, res) => {
  try {
    const { title, content, tags, image } = req.body;

    if (!title || !content || !tags || !image) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
    }

    const blogData = {
      title,
      tags,
      content,
      image,
    };

    console.log(1, blogData);

    await Blog.create(blogData);

    res.status(200).json({ success: true, message: "Blog Added" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching news", error: err.message });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) return res.status(404).json({ message: "News not found" });
    res.json(newsItem);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching news by ID", error: err.message });
  }
};

module.exports = {
  blogAdd,
};
