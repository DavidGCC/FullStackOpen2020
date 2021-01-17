const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minLength: 2
    },
    published: {
        type: Number,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'Author'
    },
    genres: [
        { type: String }
    ]
});

module.exports = mongoose.model('Book', schema);