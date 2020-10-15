import axios from "axios";


const url = "api/persons"

const getContacts = () => {
    let req = axios.get(url);
    return req.then(res => res.data);
}

const addContact = obj => { 
    let req = axios.post(url, obj);
    return req.then(res => res.data);
}

const deleteContact = id => {
    let req = axios.delete(`${url}/${id}`);
    return req.then(res => res.data)
}

const updateContact = (id, obj) => {
    let req = axios.put(`${url}/${id}`, obj);
    return req.then(res => res.data);
}

export default {
    getContacts,
    addContact,
    deleteContact,
    updateContact
}