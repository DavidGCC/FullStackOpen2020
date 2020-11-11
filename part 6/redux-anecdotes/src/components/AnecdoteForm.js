import React from 'react'
import { createAction } from '../reducers/anecdoteReducer'
import { messageAction } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
const NewAnecdote = ({createAction, messageAction}) => {
    const handleSubmit = event => {
        event.preventDefault()
        const value = event.target.anecdote.value
        try {
            messageAction(`Successfully created anecdote ${event.target.anecdote.value}.`, 5)
            createAction(value)
        } catch (err) {
            messageAction('Couldn\'t create a new anecdote', 5)
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

const mapDispatchToProps = {
    createAction, messageAction
}

export default connect(null, mapDispatchToProps)(NewAnecdote)