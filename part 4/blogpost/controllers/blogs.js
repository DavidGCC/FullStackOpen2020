const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const logger = require('../utils/logger');

router.get('/', async (request, response) => {
    const res = await Blog.find({}).populate('user', {username: 1, name: 1});
    response.json(res.map(blog => blog.toJSON()));
});

router.get('/:id', async (request, response, next) => {
    try {
        const res = await Blog.findById(request.params.id);
        response.json(res);
    } catch (error) {
        next(error);
    }
});


router.post('/', async (request, response, next) => {
    const body = request.body;
    try {
        //placeholder
        let user = await User.find({});
        user = user[0];
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user._id
        });
        const res = await blog.save({});
        user.blogs = user.blogs.concat(res._id);
        await user.save();
        response.json(res.toJSON());
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (request, response, next) => {
    const body = request.body;
    try {
        const res = await Blog.findByIdAndUpdate(request.params.id, body, { runValidators: true, new: true });
        response.json(res);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(200).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;