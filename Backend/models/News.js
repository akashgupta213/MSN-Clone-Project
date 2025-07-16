const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  category: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("News", newsSchema);
