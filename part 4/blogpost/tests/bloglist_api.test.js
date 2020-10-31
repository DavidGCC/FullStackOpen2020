const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const Blog = require('../models/blog');
const User = require('../models/user');
const testHelper = require('./test_helper');

const api = supertest(app);
let token = '';
beforeAll(async () => {
    await User.deleteMany({});
    await api.post('/api/users').send(testHelper.initialUsers[0]);
    const response = await api.post('/api/login').send({'username': 'root', 'password': 'password'});
    token = response.body.token;
})
beforeEach(async () => {
    await Blog.deleteMany({});

    let blog = testHelper.initialBlogs[0];
    await api.post('/api/blogs').send(blog).set('Authorization', `bearer ${token}`)

    blog = testHelper.initialBlogs[0];
    await api.post('/api/blogs').send(blog).set('Authorization', `bearer ${token}`)
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

    test('it should be possible to return single blog with id', async () => {
        const blogs = await testHelper.blogsInDb();
        const blog = blogs[0];
        const response = await api.get(`/api/blogs/${blog.id}`);
        expect(response.body.user).toBeDefined();
    })
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
                .set('Authorization', `bearer ${token}`)
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
                .set('Authorization', `bearer ${token}`)
                .expect(200)
                .expect('Content-Type', /application\/json/);
        const blogs = await testHelper.blogsInDb();
        const like = blogs.find(blog => blog.title === 'unspecified likes').likes;
        expect(like).toBe(0);
    });
    test('if token isn\'t provided server responds with 401 status code', async () => {
        const blog = {
            'title': 'this will not be created',
            'author': 'tester',
            'url': 'localhost:3003',
            'likes': 0
        };
        await api
                .post('/api/blogs')
                .send(blog)
                .expect(401)
    });
});

describe('HTTP DELETE Method Tests', () => {
    test('deleting a blog should return a status of 200', async () => {
        const blogsAtStart = await testHelper.blogsInDb();
        const blog = blogsAtStart[0];

        await api
                .delete(`/api/blogs/${blog.id}`)
                .set('Authorization', `bearer ${token}`)
                .expect(200)
        
        const blogsAfterDeletion = await testHelper.blogsInDb();
        expect(blogsAfterDeletion.length).toBe(blogsAtStart.length - 1);
    });

    test('if token isn\'t provided blog won\'t be deleted and response will be 401', async () => {
        const blogsAtStart = await testHelper.blogsInDb();
        const blog = blogsAtStart[0];

        await api
            .delete(`/api/blogs/${blog.id}`)
            .expect(401)
        const blogsAfterDeletion = await testHelper.blogsInDb();
        expect(blogsAfterDeletion.length).toBe(blogsAtStart.length);
    })
});

describe('HTTP PUT Method Tests', () => {
    test('updating a blog should work', async () => {
        const blogs = await testHelper.blogsInDb();
        const blog = blogs[0];
        const newBlog = {
            'title': 'This is an updated title',
        };
        const response = await api
                .put(`/api/blogs/${blog.id}`)
                .send(newBlog)
                .set('Authorization', `bearer ${token}`)
                .expect(200);
        const blogsAfterUpdate = await testHelper.blogsInDb();
        const blogAfterUpdate = blogsAfterUpdate[0];
        expect(blogAfterUpdate.title).toEqual(newBlog.title);
    });

    test('if token isn\'t provided blog won\'t be updated and will respond with status 401', async () => {
        const blogs = await testHelper.blogsInDb();
        const blog = blogs[0];
        const newBlog = {
            'title': 'This is an updated title',
        };
        const response = await api
                .put(`/api/blogs/${blog.id}`)
                .send(newBlog)
                .expect(401);
    })
});

describe('Tests for Users', () => {

    describe('HTTP POST for users', () => {
        test('adding a user should work', async () => {
            const usersAtStart = await testHelper.usersInDb();
            const startUsersLength = usersAtStart.length;
            
            const user = {
                'username': 'datunia',
                'name': 'datiko',
                'password': '5544332211'
            };

            const response = await api
                    .post('/api/users')
                    .send(user)
                    .expect(200)
            expect(response).toBeDefined();
            const usersAfter = await testHelper.usersInDb();
            expect(usersAfter.length).toBe(startUsersLength + 1);
            expect(response.body.password).toBeUndefined();
            expect(response.body.passwordHash).toBeUndefined();
            expect(response.body.name).toBe('datiko');

        });

        test('adding an user with invalid input should return an error', async () => {
            const usersAtStart = await testHelper.usersInDb();

            const user = {
                'username': 'gdatuna',
                'name': 'datunia',
            };
            await api
                    .post('/api/users')
                    .send(user)
                    .expect(400);
        });

    });
});

afterAll(() => {
    mongoose.connection.close();
})