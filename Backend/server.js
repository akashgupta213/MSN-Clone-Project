const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const newsRoutes = require("./routes/newsRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const authRoutes = require("./routes/authRoutes");

// API Routes
app.use("/api/news", newsRoutes);
app.use("/api/auth", authRoutes);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
