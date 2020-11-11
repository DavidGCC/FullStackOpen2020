import React from 'react'
import { createAction } from '../reducers/anecdoteReducer'
import { messageAction, clearAction } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdoteService'
const NewAnecdote = (props) => {

    const dispatch = useDispatch()

    let timer;

    const handleSubmit = event => {
        event.preventDefault()
        const value = event.target.anecdote.value
        try {
            clearTimeout(timer)
            dispatch(messageAction('success', `Successfully created anecdote ${event.target.anecdote.value}.`))
            setTimeout(() => dispatch(clearAction()), 5000)
            anecdoteService.createAnecdote(value).then(response => dispatch(createAction(response)))
            // dispatch(createAction(newAnecdote))
        } catch (err) {
            dispatch(messageAction('error', 'Couldn\'t create a new anecdote'))
            setTimeout(() => dispatch(clearAction()), 5000)
        }
        event.target.anecdote.value = ''
    }


    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default NewAnecdote