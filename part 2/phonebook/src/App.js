import React, { useEffect, useState } from "react";
import Display from "./components/Display";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {

    const [persons, setPersons] = useState([]);
    const [ newName, setNewName ] = useState("");
    const [ newNumber, setNewNumber ] = useState("");
    const [ filter, setFilter ] = useState("");
    const [ message, setMessage ] = useState(null);


    const handleNameChange = event => setNewName(event.target.value);

    const handleNumberChange = event => setNewNumber(event.target.value);
    
    const handleFilterChange = event => setFilter(event.target.value);

    const nullMessage = () => setTimeout(() => setMessage(null), 5000);

    const contactsToShow = filter === "" ? persons : persons.filter(it => it.name.includes(filter));

    const handleSubmit = (event) => {
        event.preventDefault();
        let newPerson = {name: newName.trim(), number: newNumber.trim()};
        let person;
        personService.getContacts()
        .then(res => {
            person = res.find(i => i.name === newName);
            if (person) {
                if (window.confirm(`${newName} already exists in the phonebook. Do you want to replace the number?`)) {
                    personService
                    .updateContact(person.id, newPerson)
                    .then(res => {
                        setMessage({type: "success", text: `Number for ${newName} has been changed to ${newNumber}.`});
                        nullMessage();
                    })
                    .catch(err => {
                        setMessage({type: "error", text: `Couldn't change number for ${newName}.`});
                        nullMessage();
                    })
                    .then(res => personService.getContacts().then(res => setPersons(res))); 
                }
            } else {
                let newPersons = [...persons];
                personService
                .addContact(newPerson)
                .then(res => {
                    setMessage({type: "success", text: `${newName} has been added to the phone book with number ${newNumber}.`});
                    nullMessage();
                })
                .catch(err => {
                    setMessage({type: "error", text: `${newName} couldn't be added to the database. Message: ${err}`});
                    nullMessage();
                })
                .then(res => personService.getContacts().then(res => setPersons(res)));
            }
        })
        setNewName("");
        setNewNumber("");
    }

    const handleDeleteClick = id => {
        const person = persons.find(i => i.id === id);
            if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
                personService
                .deleteContact(person.id)
                .then(res => {
                    setMessage({type:"success", text: `${person.name} has been deleted.`});
                    nullMessage();
                })
                .catch(err => {
                    console.log(err);
                    setMessage({type: "error", text: `${person.name} is already deleted from the database`});
                    nullMessage();
                });
                setPersons(persons.filter(i => i.id !== id));
            }
        }

    useEffect(() => personService.getContacts().then(res => setPersons(res)), []);

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter value={filter} handleChange={handleFilterChange} />
            <h2>Add a new contact</h2>
            {message && <Notification message={message}/>}
            <Form 
                nameValue={newName} 
                numberValue={newNumber} 
                handleNameChange={handleNameChange} 
                handleNumberChange={handleNumberChange}
                handleSubmit={handleSubmit} />
            <h2>Numbers</h2>
            {Object.keys(contactsToShow).length === 0 ? <p>No contacts to show.</p> : <Display persons={contactsToShow} handleDeleteClick={handleDeleteClick}/>}
        </div>
    )
}

export default App;