import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'


import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterRedcuer from './reducers/filterREducer'


const combinedReducers = combineReducers({
    anecdote: anecdoteReducer,
    notification: notificationReducer,
    filter: filterRedcuer
})


const store = createStore(combinedReducers, composeWithDevTools())

export default store