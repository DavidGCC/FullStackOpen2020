import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'


import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterRedcuer from './reducers/filterReducer'


const combinedReducers = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterRedcuer
})


const store = createStore(combinedReducers, composeWithDevTools(applyMiddleware(thunk)))

export default store