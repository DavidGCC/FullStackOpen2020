const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const Blog = require('../models/blog');
const logger = require('../utils/logger');
const testHelper = require('./test_helper');

const api = supertest(app);
beforeEach(async () => {
    await Blog.deleteMany({});

    let blog = new Blog(testHelper.initialBlogs[0])
    await blog.save();

    blog = new Blog(testHelper.initialBlogs[0]);
    await blog.save();
});

describe('HTTP GET Method Tests', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('2 blogs should be returned', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body.length).toBe(testHelper.initialBlogs.length);
    });

    test('blogs should have an id property', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body[0].id).toBeDefined();
    });
});

describe('HTTP POST Method Tests', () => {
    test('creating a new blog should work', async () => {
        const newBlog = {
            'title': 'blog created by test',
            'author': 'tester',
            'url': 'localhost:3003',
            'likes': 0
        };
    
        await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/);
    
        const blogsinDb = await testHelper.blogsInDb();
        expect(blogsinDb.length).toBe(testHelper.initialBlogs.length + 1);
    
        let titles = await testHelper.blogsInDb();
        titles = titles.map(blog => blog.title);
        expect(titles).toContain('blog created by test');
    });
});


afterAll(() => {
    mongoose.connection.close();
})