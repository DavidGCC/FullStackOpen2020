const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment')
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');



router.get('/', async (request, response) => {
    const res = await Blog.find({}).populate('user', {username: 1, name: 1}).populate('comments', {blog: 0});
    response.json(res.map(blog => blog.toJSON()));
});

router.get('/:id', async (request, response, next) => {
    try {
        const res = await Blog.findById(request.params.id).populate('user', {username: 1, name: 1}).populate('comments', {blog: 0});
        response.json(res.toJSON());
    } catch (error) {
        next(error);
    }
});


router.post('/', async (request, response, next) => {
    const body = request.body;
    token = request.token;
    try {
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
        res.user = user;
        console.log(res)
        
        response.json(res.toJSON());
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (request, response, next) => {
    const body = request.body;
    const token = request.token;
    const likeAction = request.headers.likeonly;
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const blogToUpdate = await Blog.findById(request.params.id);
        if (likeAction) {
            const res = await blogToUpdate.updateOne({likes: body.likes});
            return response.json(res);
        } else if (!token || !decodedToken) {
            console.log(request.headers)
            return response.status(401).json({error: 'token missing or invalid'});
        } else if (blogToUpdate.user.toString() !== decodedToken.id) {
            return response.status(401).json({error: 'you don\'t have the permission to perform specified action'})
        }
        const res = await blogToUpdate.updateOne(body, {runValidators: true, new: true});
        response.json(res);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (request, response, next) => {
    const token = request.token;
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const blogToDelete = await Blog.findById(request.params.id);
        if (!token || !decodedToken) {
            return response.status(401).json({error: 'token missing or invalid'});
        } else if (blogToDelete.user.toString() !== decodedToken.id) {
            return response.status(401).json({error: 'you don\'t have the permission to perform specified action'});
        } 
        await blogToDelete.deleteOne();

        response.status(200).end();
    } catch (error) {
        next(error);
    }
});

// COMMENTS ROUTES

router.get('/:id/comments', async (request, response, next) => {
    try {
        const res = await Comment.find({"blog": request.params.id})
        response.json(res)
    } catch (err) {
        next(err)
    }
})

router.post('/:id/comments', async (request, response, next) => {
    body = request.body
    try {
        const blog = await Blog.findById(request.params.id)
        const comment = new Comment({
            content: body.content,
            blog: blog._id
        })
        blog.comments = blog.comments.concat(comment._id)
        await blog.save({})
        const res = await comment.save({})
        response.json(res)
    } catch (err) {
        next(err)
    }
})
module.exports = router;