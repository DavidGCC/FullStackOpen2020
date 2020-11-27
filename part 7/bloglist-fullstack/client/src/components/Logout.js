import React from 'react'
import { logoutAction } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import propTypes from 'prop-types'

const Logout = ( { user } ) => {
    const dispatch = useDispatch()
    const handleLogout = (event) => {
        event.preventDefault()
        if (window.confirm('Are you sure you want to log out?')) {
            dispatch(logoutAction(user.name))
        }
    }
    return (
        <div>
            <h3>{user.name} is Logged In</h3>
            <button id="logoutButton" onClick={handleLogout}>Logout</button>
        </div>
    )
}

Logout.propTypes = {
    user: propTypes.object,
}

export default Logout