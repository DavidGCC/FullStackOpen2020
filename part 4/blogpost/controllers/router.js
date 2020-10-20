const router = require('express').Router();
const Blog = require('../models/blog');

router.get('/', (request, response) => {
    Blog
        .find({})
        .then(res => {
            response.json(res);
        });
});


router.post('/', (request, response) => {
    const { title, author, url, likes } = request.body;
    const blog = new Blog({
        title: title,
        author: author,
        url: url,
        likes: likes
    });
    blog
        .save({})
        .then(res => {
            response.json(res);
        });
});

module.exports = router;