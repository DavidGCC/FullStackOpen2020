import axios from 'axios'


const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (content) => {
    const newAnecdote = {
        content,
        votes: 0
    }
    const resposne = await axios.post(baseUrl, newAnecdote)
    return resposne.data
}

const updateAnecdote = async (anecdote, id) => {
    const response = await axios.put(`${baseUrl}/${id}`, {...anecdote, votes: anecdote.votes + 1})
    return response.data
}


export default { getAll, createAnecdote, updateAnecdote }