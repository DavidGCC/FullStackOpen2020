import React, { useEffect, useState } from "react";
import Display from "./components/Display";
import Form from "./components/Form";
import Filter from "./components/Filter";
import personService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([]);

    const [ newName, setNewName ] = useState("");
    const [ newNumber, setNewNumber ] = useState("");
    const [ filter, setFilter ] = useState("");

    const handleNameChange = event => setNewName(event.target.value);

    const handleNumberChange = event => setNewNumber(event.target.value);
    
    const handleFilterChange = event => setFilter(event.target.value);
    


    const contactsToShow = filter === "" ? persons : persons.filter(it => it.name.includes(filter));

    const handleSubmit = (event) => {
        event.preventDefault();
        let newPerson = {name: newName, number: newNumber, id: newName};
        if (persons.find(it => it.name === newName)) {
            if (window.confirm(`${newName} already exists in the phonebook. Do you want to replace the number?`)) {
                personService.updateContact(newName, newPerson);
                personService.getContacts().then(res => setPersons(res));
            }
        } else {
            personService.addContact(newPerson);
            let newPersons = [...persons];
            newPersons.push(newPerson);
            setPersons(newPersons);
        }
        setNewName("");
        setNewNumber("");
    }

    const handleDeleteClick = id => {
        if (window.confirm(`Are you sure you want to delete ${id}?`)) {
            personService.deleteContact(id);
            setPersons(persons.filter(i => i.id !== id));
        }
    }

    useEffect(() => {
        personService.getContacts().then(res => setPersons(res));
    }, []);

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter value={filter} handleChange={handleFilterChange} />
            <h2>Add a new contact</h2>
            <Form 
                nameValue={newName} 
                numberValue={newNumber} 
                handleNameChange={handleNameChange} 
                handleNumberChange={handleNumberChange}
                handleSubmit={handleSubmit} />
            <h2>Numbers</h2>
            <Display persons={contactsToShow} handleDeleteClick={handleDeleteClick}/>
        </div>
    )
}

export default App;