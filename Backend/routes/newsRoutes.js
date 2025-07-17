const express = require("express");
const router = express.Router();
const { getAllNews, getNewsById, blogAdd  , deleteNews} = require("../controllers/newsController");

router.get("/", getAllNews);      

router.get("/:id", getNewsById);   

router.post('/blogAdd', blogAdd)

router.post('/:id' , deleteNews)

module.exports = router;
