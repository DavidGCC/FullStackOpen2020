require("dotenv").config();
const mongoose = require("mongoose");


if (process.argv.length < 3) {
    console.log("Please enter your password. Ex. node mongo.js <password> To list all contacts\nOr node mongo.js <password> <name_to_add> <number_to_add> To add new contact");
    process.exit(1);
}
const password = process.argv[2];

const url = `mongodb+srv://davidgvetadze:${password}@persons.1oeqg.mongodb.net/Persons?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});
personSchema.set("toJSON", {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})
const Person = mongoose.model("Person", personSchema);

if (process.argv.length == 3) {
    console.log("Phonebook: ")
    Person.find({})
    .then(res => {
        res.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        })
        mongoose.connection.close();
    })
}

if (process.argv.length == 4) {
    console.log("If you're trying to add a new contact please specify both name and a number. Use quotes if the name contains space.");
    process.exit(1);
}

if (process.argv.length == 5) {
    const newName = process.argv[3];
    const newNumber = process.argv[4];
    const person = new Person({
        name: newName,
        number: newNumber
    });
    person.save().then(res => {
        console.log(`Added ${newName} number ${newNumber} to phonebook`);
        mongoose.connection.close();
    })
}