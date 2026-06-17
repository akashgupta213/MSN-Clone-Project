const News = require("../models/News.js");
 

exports.addBlog = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : "";
  
    const newBlog = new News({ 
      title, 
      description, 
      category, 
      image,
      author: req.user.id 
    });
    
    await newBlog.save();
    res.status(201).json({ message: "Blog added successfully", blog: newBlog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET all blogs
exports.getAllNews = async (req, res) => {
  try {
    const blogs = await News.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

// GET blog by ID
exports.getNewsById = async (req, res) => {
  try {
    const blog = await News.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
};

// DELETE blog by ID
exports.deleteNews = async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    
    if (!newsItem) {
      return res.status(404).json({ message: "News not found" });
    }

    // Check ownership. Allow backward compatibility for seeded data (no author).
    // In production, you might want to only allow deletion if author matches.
    if (newsItem.author && newsItem.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized to delete this news" });
    }

    await News.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting news", error });
  }
};

// POST new blog
exports.blogAdd = async (req, res) => {
  try {
    const { title, category, content, image } = req.body;
    const newBlog = new News({ title, category, content, image });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: "Error adding blog", error });
  }
};
