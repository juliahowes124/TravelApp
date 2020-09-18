const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const likeSchema = new Schema({
    user: { type: String, required: true, ref: "User"},
    post: { type: String, required: true, ref: "Post"}
});


module.exports = mongoose.model('Like', likeSchema);