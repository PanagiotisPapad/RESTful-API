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

//Delete article endpoint
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