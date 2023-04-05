const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    label:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    password:{
        type: String
    }
})

const postModel = mongoose.model('post', postSchema)

module.exports = postModel;