const morgan = require("morgan");
const express = require("express");
const app = express();


app.use(express.json());
morgan.token("reqBody", (req, res) => {
    if (req.method !== "POST") {
        return " ";
    } else {
        return JSON.stringify(req.body);
    }
});

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

app.get("/", (req, res) => {
    res.send("<h1>A Simple Hello Page</h1>");
})

app.get("/api/persons", (req, res) => {
    res.json(persons);
})

app.get("/info", (req, res) => {
    res.send(
        `<p>Phonebook has records for ${persons.length} people.</p>
        <br>
        <p>${new Date()}</p>`
    )
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const note = persons.find(i => i.id === id);
    if (note) {
        res.json(note);
    } else {
        res.status(404).end();
    }
})
app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(i => i.id !== id);
    res.status(204).end();
})
app.post("/api/persons", (req, res) => {
    let body = req.body;
    let randomId = Math.floor(Math.random() * 100000);
    if (!(body.hasOwnProperty("name") && body.hasOwnProperty("number"))) {
        return res.json({
            error: `Name or Number is missing`
        })
    }
    if (persons.find(i => i.name === body.name)) {
        return res.json({
            error: `${body.name} already exists in database`
        })
    }

    const newContact = {
        name: body.name,
        number: body.number,
        id: randomId
    }
    persons = persons.concat(newContact);
    res.json(newContact);
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`);
});