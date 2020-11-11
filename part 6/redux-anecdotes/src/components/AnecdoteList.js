import React, { useEffect } from 'react'
import Anecdote from './Anecdote'
import { useSelector, useDispatch } from 'react-redux'
import { voteAction, initializeData } from '../reducers/anecdoteReducer'
import { messageAction } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    
    useEffect(() => {
        dispatch(initializeData())
    }, [dispatch])
    const anecdotes = useSelector(state => state.anecdote)

    anecdotes.sort((a, b) => b.votes - a.votes)
    const vote = (anecdote) => {
        try {
            dispatch(voteAction(anecdote))
            dispatch(messageAction(`You voted ${anecdote.content}`, 5))
        } catch (err) {
            dispatch(messageAction(`Couldn't Vote ${anecdote.content}`, 5))
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