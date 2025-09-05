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


router.get("/", getAllNews);


router.get("/:id", getNewsById);


router.post("/", verifyToken, upload.single("image"), (req, res, next) => {
  console.log("📩 Incoming Add News request:");
  console.log("Body:", req.body);
  console.log("File:", req.file);
  next();
}, addNews);


router.put("/:id", verifyToken, upload.single("image"), updateNews);


router.delete("/:id", verifyToken, deleteNews);

module.exports = router;
