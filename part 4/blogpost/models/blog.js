const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: String,
    url: {type: String, required: true},
    likes: Number
});

blogSchema.set('toJSON', {
    transform: (doc, obj) => {
        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;
    }
});

module.exports = mongoose.model('Blog', blogSchema);