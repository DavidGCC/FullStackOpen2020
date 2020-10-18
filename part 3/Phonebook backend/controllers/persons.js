const router = require('express').Router();
const Person = require('../models/Person');


router.get('/', (request, response) => {
    Person
        .find({})
        .then(res => response.json(res));
});

router.get('/info', () => {
    Person
        .countDocuments({})
        .then(res => {
            res.send(
                `<p>Phonebook has records for ${res} people</p>
                <br>
                <p>${new Date()}</p>`
            );
        });
});

router.get('/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(res => response.json(res))
        .catch(err => next(err));
});

router.post('/', (request, response, next) => {
    const body = request.body;
    const person = new Person({
        name: body.name,
        number: body.number
    });
    person
        .save({})
        .then(res => response.json(res))
        .catch(err => next(err));
});

router.put('/:id', (request, response, next) => {
    const body = request.body;
    Person
        .findByIdAndUpdate(request.params.id, { $set: { 'number': body.number } }, { new: true }, { runValidators: true })
        .then(res => response.json(res))
        .catch(err => next(err));
});

router.delete('/:id', (request, response, next) => {
    Person
        .findByIdAndRemove(request.params.id)
        .then(() => response.status(204).end())
        .catch(err => next(err));
});


module.exports = router;