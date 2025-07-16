
const Blog = require("../models/BlogAdd.model");

// GET all blogs
exports.getAllNews = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

// GET blog by ID
exports.getNewsById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
};

// POST new blog
exports.blogAdd = async (req, res) => {
  try {
    const { title, category, content, image } = req.body;
    const newBlog = new Blog({ title, category, content, image });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: "Error adding blog", error });
  }
};
