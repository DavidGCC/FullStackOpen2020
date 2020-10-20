const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

blogSchema.set('toJSON', {
    transform: (doc, obj) => {
        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;
    }
});

module.exports = mongoose.model("Blog", blogSchema);