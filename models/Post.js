const mongoose = require('mongoose');

//  create post schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    postImg: {
    type: String,
    default: ""
    },
    category: String,

    tags: [String],

    likes: {
        type: Number,
        default: 0
    },
    postDate: {
        type: Date,
        default: Date.now
    }
}, timestamp = true);
module.exports = mongoose.model('Post', postSchema);