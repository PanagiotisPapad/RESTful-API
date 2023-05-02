const express = require("express");
const mongoose = require("mongoose");
const articlesRouter = express.Router();
const Article = require("../controllers/article.js");
const articles = require("../model/article.js")

//Get all articles
articlesRouter.get("/articles", Article.getAll);

//Create a new article
articlesRouter.post("/articles", Article.create);

//Delete an article by ID
articlesRouter.delete("/articles/:articleId", Article.delete);

module.exports = articlesRouter;
