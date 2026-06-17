const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  category: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // false for backward compatibility with seeded data
  createdAt: { type: Date, default: Date.now }
},
  { timestamps: true });


module.exports = mongoose.model("News", newsSchema);



