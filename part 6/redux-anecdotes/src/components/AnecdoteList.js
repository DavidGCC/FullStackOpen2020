import React from 'react'
import Anecdote from './Anecdote'
import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)
    anecdotes.sort((a, b) => b.votes - a.votes)
    return (
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => dispatch(voteAction(anecdote.id))} />
            )}
        </div>
    )
}

export default AnecdoteList