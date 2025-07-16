const express = require("express");
const router = express.Router();
const { getAllNews, getNewsById, blogAdd } = require("../controllers/newsController");

router.get("/news", getAllNews);
router.get("/news/:id", getNewsById);

router.post('/blogAdd', blogAdd)

module.exports = router;
