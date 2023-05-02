const article = require("../model/article.js");
const Article = require("../model/article.js");
const mongoose = require("mongoose")

//Get all articles endpoint
exports.getAll = (req, res) => {
  Article.find()
    .exec()
    .then((docs) => {
        res.status(200).send({ docs });
    })
    .catch((err) => {
        res.status(500).send({
            message: "An error occurred while fetching all articles"
        })
    });
};

//Get a specific article by ID
exports.getOneById = (req, res) => {
    const id = req.params.articleId
    Article.findById(id)
        .exec()
        .then(doc => {
           if (!doc) {
            res.status(404).json({
                message: "Article not found with id: " + id
            })
           } 
           res.status(200).json(doc) 
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Invalid id given " + id + ". Please provide a valid article id."
            })
        })
}

//Get a specific article by article title
exports.getOneByTitle = (req, res) => {
    const title = req.params.articleTitle
    Article.find({ title })
        .exec()
        .then(articles => {
            console.log(articles)
            if (articles.length === 0) {
                return res.status(404).json({
                    message: "No articles found with this title."
                })
            }
            res.status(200).json(articles)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Internal server error"
            })
        })
}

//Create article endpoint
exports.create = (req, res) => {
    const article = new Article ({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content
    })
    article
        .save()
        .then(result => {
            console.log(result)
            res.status(201).json(result)
        })
        .catch(err => console.log(err));
};

//Update a part of an article by Id (Patch Request)
exports.update = (req, res) => {
    const id = req.params.articleId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Article.findOneAndUpdate({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "Article not found with id: " + id
                })
            }
            res.status(200).json({
                message: "Article updated successfully."
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Internal server error"
            })
        })
}

/*
Format to update an event: 
[
    {
     "propName": "title", "value": "RESTful" ,
    }
]

This example request changes the title of the article that has the Id given in the URL 
*/

//Update an entire article by Id (Put Request)
exports.updateAll = (req, res) => {
    const id = req.params.articleId

    if (!req.body.title || !req.body.content) {
        return res.status(400).json({
            message: "Title and content are required"
        })
    }
    Article.findByIdAndUpdate(id, req.body, {new: true })
        .then((result => {
            if (!result) {
                return res.status(404).send({
                    message: "Article not found with id " + id
                })
            }
            res.status(200).json({
                message: "Event updated successfully"
            })
        }))
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Internal server error"
            })
        })
}

//Delete an article by ID
exports.delete = (req, res) => {
    const id = req.params.articleId
    Article.findOneAndRemove({ _id: id })
        .exec()
        .then(result => {
            if (!result) {
                res.status(404).json({
                    message: "Article not found with id: " + id
                })
            } else {
                res.status(200).json({
                    message: "Article deleted successfully"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                err: err
            })
        })
}