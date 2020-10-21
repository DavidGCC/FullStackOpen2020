const Blog = require('../models/blog');


const initialBlogs = [
    {
        'title': 'a blog number 1',
        'author': 'David Getadze',
        'url': 'alink',
        'likes': 100
    },
    {
        'title': 'a blog number 2',
        'author': 'L Gvetadze',
        'url': 'different link',
        'likes': 10
    },
];

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog);
}

module.exports = {
    initialBlogs, blogsInDb
}