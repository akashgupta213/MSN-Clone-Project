// routes/newsRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllNews,
  getNewsById,
  addNews,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");

const { verifyToken } = require("../middleware/auth");
const upload = require("../middleware/upload");

// ✅ GET all news
router.get("/", getAllNews);

// ✅ GET single news by ID
router.get("/:id", getNewsById);

// ➕ POST (Add News with image upload)
router.post("/", verifyToken, upload.single("image"), (req, res, next) => {
  console.log("📩 Incoming Add News request:");
  console.log("Body:", req.body);
  console.log("File:", req.file);
  next();
}, addNews);

// ✏️ PUT (Update News by ID, allow optional new image)
router.put("/:id", verifyToken, upload.single("image"), updateNews);

// ❌ DELETE (Delete News by ID)
router.delete("/:id", verifyToken, deleteNews);

module.exports = router;
