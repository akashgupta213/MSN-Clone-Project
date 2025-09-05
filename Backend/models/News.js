import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String }, // image URL
  author: { type: String, default: "Anonymous" },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("News", newsSchema);
