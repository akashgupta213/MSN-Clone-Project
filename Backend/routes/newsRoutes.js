const express = require("express");
const multer = require("multer");
const router = express.Router();
const { getAllNews, getNewsById, addBlog, deleteNews } = require("../controllers/newsController");
const { protect } = require("../middleware/authMiddleware");

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

router.get("/", getAllNews);      

router.get("/:id", getNewsById);   

router.post("/blogAdd", protect, upload.single("image"), addBlog);

router.delete('/:id', protect, deleteNews);

module.exports = router;
