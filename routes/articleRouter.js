const express = require("express");
const mongoose = require("mongoose");
const articlesRouter = express.Router();
const Article = require("../controllers/article.js");

//Get all articles
articlesRouter.get("/articles", Article.getAll);

//Get a specific article by Id
articlesRouter.get("/articles/:articleId", Article.getOneById);

//Get a specific article by article title
articlesRouter.get("/articles/title/:articleTitle" , Article.getOneByTitle);

//Create a new article
articlesRouter.post("/articles", Article.create);

//Patch a part of a specific article
articlesRouter.patch("/articles/:articleId", Article.update);

//Update an entire article
articlesRouter.put("/articles/:articleId", Article.updateAll);

//Delete an article by ID
articlesRouter.delete("/articles/delete/:articleId", Article.delete);

module.exports = articlesRouter;
