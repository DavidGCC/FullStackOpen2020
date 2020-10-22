const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


router.get('/', async (request, response) => {
    const allUsers = await User.find({}).populate('blogs');
    response.json(allUsers);
});

router.post('/', async (request, response, next) => {
    const body = request.body;
    
    const salt = 10;
    try {
        const passwordHash = await bcrypt.hash(body.password, salt);
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        });

        const res = await user.save({});
        response.json(res);
    } catch (error) {
        next(error);
    }
});

module.exports = router;