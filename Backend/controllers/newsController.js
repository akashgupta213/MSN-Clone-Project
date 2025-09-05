const News = require("../models/BlogAdd.model");

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
};

exports.addNews = async (req, res) => {
  try {
    console.log("📩 Incoming AddNews Request:");
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const { title, category, content, author } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newNews = new News({ title, category, content, author, image });
    const savedNews = await newNews.save();

    res.status(201).json(savedNews);
  } catch (error) {
    console.error("❌ AddNews Error:", error);
    res.status(400).json({ message: "Error adding news", error: error.message });
  }
};


exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, content, author } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

  
    const updateData = { title, category, content, author };
    if (image) updateData.image = image;

    const updatedNews = await News.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedNews) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json(updatedNews);
  } catch (error) {
    res.status(400).json({ message: "Error updating news", error });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting news", error });
  }
};
