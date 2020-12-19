import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'


import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const combinedReducers = combineReducers({
    blogs: blogsReducer,
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer
})


const store = createStore(combinedReducers, composeWithDevTools(applyMiddleware(thunk)))
export default store