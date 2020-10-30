const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');

const getToken = (request) => {
    const auth = request.get('authorization');

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        return auth.substring(7);
    }
    return null;
}


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
        const token = getToken(request);
        const decodedToken = jwt.verify(token, process.env.SECRET);

        if (!token || !decodedToken) {
            return response.status(401).json({error: 'token missing or invalid'});
        }

        const user = await User.findById(decodedToken.id);

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