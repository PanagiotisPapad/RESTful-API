const express = require("express")
const mongoose = require("mongoose");

const wikiSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model("Article", wikiSchema);