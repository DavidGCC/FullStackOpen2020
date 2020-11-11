import React, { useEffect } from 'react'
import Anecdote from './Anecdote'
import { useSelector, useDispatch } from 'react-redux'
import { voteAction, initializeData } from '../reducers/anecdoteReducer'
import { messageAction, clearAction } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    
    useEffect(() => {
        dispatch(initializeData())
    }, [dispatch])
    const anecdotes = useSelector(state => state.anecdote)

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