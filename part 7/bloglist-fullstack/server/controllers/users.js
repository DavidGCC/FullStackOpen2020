const router = require('express').Router();
const User = require('../models/user');
const Blog = require('../models/blog');
const bcrypt = require('bcrypt');


router.get('/', async (request, response) => {
    const allUsers = await User.find({}).populate('blogs');
    response.json(allUsers);
});

router.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id).populate('blogs')
    response.json(user)
})

router.post('/', async (request, response, next) => {
    const body = request.body;

    if (!body.password || body.password < 3) {
        return response.status(400).send({error: 'Password must be at least 3 characters long!'});
    }
    
    const salt = 10;
    try {
        const passwordHash = await bcrypt.hash(body.password, salt);
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        });
        const res = await user.save();
        response.json(res);
    } catch (error) {
        next(error);
    }
});

module.exports = router;