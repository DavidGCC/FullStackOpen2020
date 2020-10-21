const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const Blog = require('../models/blog');
const logger = require('../utils/logger');
const testHelper = require('./test_helper');
const { post } = require('../app');

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
        const blog = {
            'title': 'blog created by test',
            'author': 'tester',
            'url': 'localhost:3003',
            'likes': 0
        };
    
        await api
                .post('/api/blogs')
                .send(blog)
                .expect(200)
                .expect('Content-Type', /application\/json/);
    
        const blogs = await testHelper.blogsInDb();
        expect(blogs.length).toBe(testHelper.initialBlogs.length + 1);
    
        let titles = await testHelper.blogsInDb();
        titles = titles.map(blog => blog.title);
        expect(titles).toContain('blog created by test');
    });
    
    test('if likes property isn\'t specified it should default to 0', async () => {
        const blog = {
            'title': 'unspecified likes',
            'author': 'somebody',
            'url': 'anotherUrl'
        };

        await api
                .post('/api/blogs')
                .send(blog)
                .expect(200)
                .expect('Content-Type', /application\/json/);
        const blogs = await testHelper.blogsInDb();
        const like = blogs.find(blog => blog.title === 'unspecified likes').likes;
        expect(like).toBe(0);
    });
});

describe('HTTP DELETE Method Tests', () => {
    test('deleting a blog should return a status of 200', async () => {
        const blogsAtStart = await testHelper.blogsInDb();
        const blog = blogsAtStart[0];

        await api
                .delete(`/api/blogs/${blog.id}`)
                .expect(200)
        
        const blogsAfterDeletion = await testHelper.blogsInDb();
        expect(blogsAfterDeletion.length).toBe(blogsAtStart.length - 1);
    });
})

afterAll(() => {
    mongoose.connection.close();
})