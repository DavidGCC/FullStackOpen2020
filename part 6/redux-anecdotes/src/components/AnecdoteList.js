import React from 'react'
import Anecdote from './Anecdote'
import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { messageAction, clearAction } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdote)
    const filter = useSelector(state => state.filter)
    anecdotes.sort((a, b) => b.votes - a.votes)
    let timer;
    const vote = (anecdote) => {
        try {
            dispatch(voteAction(anecdote.id))
            clearTimeout(timer)
            dispatch(messageAction('success', `You voted ${anecdote.content}`))
            timer = setTimeout(() => dispatch(clearAction()), 5000)
        } catch (err) {
            dispatch(messageAction('error', `Couldn't Vote ${anecdote.content}`))
        }
    }
    const filteredAnecdotes = filter === '' ? anecdotes : anecdotes.filter(anecdote => anecdote.content.includes(filter))
    return (
        <div>
            {filteredAnecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote)} />
            )}
        </div>
    )
}

export default AnecdoteList