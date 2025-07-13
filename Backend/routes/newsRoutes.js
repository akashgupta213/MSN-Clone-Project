const express = require("express");
const router = express.Router();
const { getAllNews, getNewsById } = require("../controllers/newsController");

router.get("/news", getAllNews);
router.get("/news/:id", getNewsById);

module.exports = router;
