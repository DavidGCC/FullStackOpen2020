import React from 'react'
import Anecdote from './Anecdote'
import { connect } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { messageAction } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes

    anecdotes.sort((a, b) => b.votes - a.votes)
    const vote = (anecdote) => {
        try {
            props.voteAction(anecdote)
            props.messageAction(`You voted ${anecdote.content}`, 5)
        } catch (err) {
            props.messageAction(`Couldn't Vote ${anecdote.content}`, 5)
        }
    }
    return (
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote)} />
            )}
        </div>
    )
}

const mapStateToProps = state => {
    if (state.filter === '') {
        return {
            anecdotes: state.anecdotes
        }
    }
    return {
        anecdotes: state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    }
}

const mapDispatchToProps = {
    voteAction, messageAction
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)