const mongoose = require("mongoose")
const Schema = mongoose.Schema

const articleShema = new Schema ({
    title: String,
    body: String,
    numberOfLikes: Number,
})

const Article = mongoose.model("Article", articleShema) 

module.exports = Article