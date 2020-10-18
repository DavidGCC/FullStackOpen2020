const morgan = require("morgan");
const express = require("express");
const app = express();
const cors = require("cors");
const Person = require("./models/Person");
const { response } = require("express");

app.use(express.json());
app.use(cors());

morgan.token("reqBody", (req, res) => {
    if (req.method !== "POST") {
        return " ";
    } else {
        return JSON.stringify(req.body);
    }
});
app.use(express.static(`${__dirname}/build`))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :reqBody"));

app.get("/api/persons", (req, res) => {
    Person.find({}).then(result => res.json(result));    
})

app.get("/info", (req, res) => {
    Person.countDocuments({}).then(result => {
        res.send(
            `<p>Phonebook has records for ${result} people.</p>
            <br>
            <p>${new Date()}</p>`
        )
    })
})

app.get("/api/persons/:id", (req, res, next) => {
    Person.findById(req.params.id)
    .then(r => res.json(r))
    .catch(err => next(err));
})
app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
    .then(r => res.status(204).end())
    .catch(err => next(err));
})
app.post("/api/persons", (req, res, next) => {
    let body = req.body;
    const person = new Person({
        name: body.name,
        number: body.number
    });
    person.save({}).then(r => res.json(r))
    .catch(err => next(err)); 
});

app.put("/api/persons/:id", (req, res, next) => {
    const body = req.body;
    Person.findByIdAndUpdate(req.params.id, { $set: { "number": body.number }}, {runValidators: true})
    .then(r => res.json(r))
    .catch(err => next(err));
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message);
    if (error.name === "CastError") {
        return res.status(400).send({error: "Malformed Id"});
    }
    if (error.name === "ValidationError") {
        res.status(400).send({error: error.message})
    }


    next(error);
};
app.use(errorHandler);

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: "Unknown endpoint"});
}
app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`);
});