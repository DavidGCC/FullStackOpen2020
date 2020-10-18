const morgan = require("morgan");
const express = require("express");
const app = express();
const cors = require("cors");
const Person = require("./models/Person");

app.use(cors());
app.use(express.json());
morgan.token("reqBody", (req, res) => {
    if (req.method !== "POST") {
        return " ";
    } else {
        return JSON.stringify(req.body);
    }
});
app.use(express.static(`${__dirname}/build`))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :reqBody"));

let persons = [
    { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
    },
    { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
    },
    { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
    },
    { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
    }
];

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

app.get("/api/persons/:id", (req, res) => {
    Person.findById(req.params.id)
    .then(r => res.json(r))
    .catch(err => res.send(`Couldn't accsess the specified contact ${err.message}`));
})
app.delete("/api/persons/:id", (req, res) => {
    Person.findByIdAndRemove(req.params.id)
    .then(r => res.status(204).end())
    .catch(err => r.send(`Couldn't delete the contact ${err.message}`));
})
app.post("/api/persons", (req, res) => {
    let body = req.body;
    const person = new Person({
        name: body.name,
        number: body.number
    });
    person.save({}).then(r => res.json(r))
    .catch(err => res.send(`Couldn't add the contact ${err.message}`)); 
});
app.put("/api/persons/:id", (req, res) => {
    const body = req.body;
    Person.findByIdAndUpdate(req.params.id, { $set: { "number": body.number }})
    .then(r => res.json(r))
    .catch(err => res.send(`Couldn't update the specified contact ${err.message}`));
})
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`);
});