import React, { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeData } from './reducers/anecdoteReducer'
import { connect } from 'react-redux'

const App = (props) => {
    useEffect(() => {
        props.initializeData()
    }, [props])
    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <AnecdoteList />
            <AnecdoteForm />
            <Filter />
        </div>
    )
}

const mapDispatchToProps = {
    initializeData
}

export default connect(null, mapDispatchToProps)(App)