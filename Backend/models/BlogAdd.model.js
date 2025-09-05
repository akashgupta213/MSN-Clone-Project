const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: "General" },
  content: { type: String, required: true },
  author: { type: String, default: "Admin" },
  image: { type: String, default: null },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("News", BlogSchema);
