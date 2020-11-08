import React from 'react'
import { createAction } from '../reducers/anecdoteReducer'
import { messageAction, clearAction } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const NewAnecdote = (props) => {

    const dispatch = useDispatch()

    let timer;

    const handleSubmit = event => {
        event.preventDefault()
        try {
            clearTimeout(timer)
            dispatch(messageAction('success', `Successfully created anecdote ${event.target.anecdote.value}.`))
            setTimeout(() => dispatch(clearAction()), 5000)
            const value = event.target.anecdote.value
            dispatch(createAction(value))
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