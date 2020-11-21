const Blog = require('../models/blog');
const User = require('../models/user');

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

const initialUsers = [
    {
        'username': 'root',
        'name': 'Root',
        'password': 'password'
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog);
}

const usersInDb = async () => {
    const users = await User.find({}) ;
    return users.map(user => user);
}

module.exports = {
    initialBlogs, blogsInDb, initialUsers, usersInDb
}