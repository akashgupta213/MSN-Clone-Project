const express = require("express");
const router = express.Router();
const { getAllNews, getNewsById, blogAdd } = require("../controllers/newsController");

router.get("/", getAllNews);      

router.get("/:id", getNewsById);   

router.post('/blogAdd', blogAdd)

module.exports = router;
