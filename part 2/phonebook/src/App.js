import React, { useEffect, useState } from "react";
import Display from "./components/Display";
import Form from "./components/Form";
import Filter from "./components/Filter";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([
        { 
            name: "Arto Hellas",
            number: "040-12344567",
        }
    ]);

    const [ newName, setNewName ] = useState("");
    const [ newNumber, setNewNumber ] = useState("");
    const [ filter, setFilter ] = useState("");

    const handleNameChange = event => setNewName(event.target.value);

    const handleNumberChange = event => setNewNumber(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (persons.find(it => it.name === newName)) {
            alert(`${newName} already exists in the phonebook.`);
        } else {
            let newPersons = [...persons];
            newPersons.push({name: newName, number: newNumber});
            setPersons(newPersons);
            setNewName("");
            setNewNumber("");
        }
    }

    const handleFilterChange = event => setFilter(event.target.value);

    useEffect(() => {
        axios
        .get("http://localhost:3001/persons")
        .then(respone => {
            setPersons(respone.data);
        });
    }, []);

    const contactsToShow = filter === "" ? persons : persons.filter(it => it.name.includes(filter));
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
            <Display persons={contactsToShow} />
        </div>
    )
}

export default App;