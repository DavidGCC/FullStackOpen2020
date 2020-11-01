const listHelper = require('../utils/list_helper').favoriteBlog;

describe('favorite blog', () => {
    const blog = [
        {
            "title": "A Test Blog",
            "author": "David Gvetadze",
            "url": "localhost:3003",
            "likes": 111
        }
    ];

    const blogs = [
        {
            'title': "blog 1",
            'author': 'dg',
            'url': 'local',
            'likes': 1
        },
        {
            "title": "A Test Blog",
            "author": "David Gvetadze",
            "url": "localhost:3003",
            "likes": 111
        }
    ]    
    test('when there\'s only one blog', () => {
        const result = listHelper(blog);
        expect(result).toEqual({
            "title": "A Test Blog",
            "author": "David Gvetadze",
            "url": "localhost:3003",
            "likes": 111
        });
    });

    test('when there are multiple blogs', () => {
        const result = listHelper(blogs);
        expect(result).toEqual({
            "title": "A Test Blog",
            "author": "David Gvetadze",
            "url": "localhost:3003",
            "likes": 111
        });
    });
});