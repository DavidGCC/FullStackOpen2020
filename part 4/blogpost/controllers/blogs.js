const router = require('express').Router();
const { response } = require('express');
const { request } = require('../app');
const Blog = require('../models/blog');
const logger = require('../utils/logger');

router.get('/', async (request, response) => {
    const res = await Blog.find({}).populate('user', {username: 1, name: 1});
    response.json(res);
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
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0
        });
        const res = await blog.save({});
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