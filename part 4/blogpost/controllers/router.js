const router = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');

router.get('/', async (request, response) => {
    const res = await Blog.find({});
    response.json(res);
});


router.post('/', async (request, response) => {
    const body = request.body;
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    });
    const res = await blog.save({});
    response.json(res.toJSON());
});

module.exports = router;