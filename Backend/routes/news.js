import express from "express";
import News from "../models/News.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// ✅ GET all news
router.get("/", async (req, res) => {
  const news = await News.find().sort({ date: -1 });
  res.json(news);
});

// ✅ GET by ID
router.get("/:id", async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ error: "News not found" });
    res.json(news);
  } catch {
    res.status(500).json({ error: "Invalid ID" });
  }
});

// ➕ POST (Add News)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, category, image, author } = req.body;
    const news = new News({ title, description, category, image, author });
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✏️ PUT (Edit News)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedNews) return res.status(404).json({ error: "News not found" });
    res.json(updatedNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ❌ DELETE (Delete News)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "News not found" });
    res.json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
