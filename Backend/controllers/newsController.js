<<<<<<< HEAD
const News = require("../models/News");

const blogAdd = async (req, res) => {
  try {
    const { title, content, category, image } = req.body;

    if (!title || !content || !category || !image) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
    }

    const blogData = {
      title,
      category,
      content,
      image,
    };

    console.log(1, blogData);

    await News.create(blogData);

    res.status(200).json({ success: true, message: "Blog Added" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllNews = async (req, res) => {
=======

const Blog = require("../models/BlogAdd.model");

// GET all blogs
exports.getAllNews = async (req, res) => {
>>>>>>> 813efc57f220ae65f7ba8cfd63700f93e9bba912
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

<<<<<<< HEAD
const getNewsById = async (req, res) => {
=======
// GET blog by ID
exports.getNewsById = async (req, res) => {
>>>>>>> 813efc57f220ae65f7ba8cfd63700f93e9bba912
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
};

<<<<<<< HEAD


module.exports = {blogAdd,getNewsById, getAllNews}
=======
// DELETE blog by ID
exports.deleteNews = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting news", error });
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
>>>>>>> 813efc57f220ae65f7ba8cfd63700f93e9bba912
