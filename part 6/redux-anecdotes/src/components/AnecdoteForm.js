import React from 'react'
import { createAction } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const NewAnecdote = (props) => {

    const dispatch = useDispatch()

    const handleSubmit = event => {
        event.preventDefault()
        const value = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAction(value))
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