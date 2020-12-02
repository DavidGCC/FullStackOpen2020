const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
    content: {type: String, required: true, minlength: 3},
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }
})
commentSchema.set('toJSON', {
    transform: (doc, obj) => {
        obj.id = obj._id.toString()
        delete obj._id
        delete obj.__v
    }
})

module.exports = mongoose.model("Comment", commentSchema)