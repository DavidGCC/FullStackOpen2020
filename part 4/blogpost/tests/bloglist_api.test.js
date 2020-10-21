const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const Blog = require('../models/blog');

const api = supertest(app);
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

beforeEach(async () => {
    await Blog.deleteMany({});

    let blog = new Blog(initialBlogs[0]);
    await blog.save();

    blog = new Blog(initialBlogs[1]);
    await blog.save();
});

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('2 blogs should be returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body.length).toBe(initialBlogs.length);
});

test('blogs should have an id property', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
});

test('creating a new blog should work', async () => {
    const newBlog = {
        'title': 'blog created by test',
        'author': 'tester',
        'url': 'localhost:3003',
        'likes': 0
    };

    try {
        await api.post('/api/blogs').send(newBlog).expect(200);
    } catch (error) {
        console.log(error);
    }

});


afterAll(() => {
    mongoose.connection.close();
})