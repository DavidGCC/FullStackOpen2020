import React from 'react'
import { createAction } from '../reducers/anecdoteReducer'
import { messageAction } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
const NewAnecdote = (props) => {

    const dispatch = useDispatch()


    const handleSubmit = event => {
        event.preventDefault()
        const value = event.target.anecdote.value
        try {
            dispatch(messageAction(`Successfully created anecdote ${event.target.anecdote.value}.`, 5))
            dispatch(createAction(value))
        } catch (err) {
            dispatch(messageAction('Couldn\'t create a new anecdote', 5))
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