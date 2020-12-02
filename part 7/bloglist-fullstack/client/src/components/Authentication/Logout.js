import React from 'react'
import { logoutAction } from '../../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import propTypes from 'prop-types'

const Logout = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const handleLogout = (event) => {
        event.preventDefault()
        if (window.confirm('Are you sure you want to log out?')) {
            dispatch(logoutAction(user.name))
        }
    }
    return (
        <div>
            <p style={{ display: 'inline' }}>{user.name} is Logged In</p>
            <button id="logoutButton" onClick={handleLogout}>Logout</button>
        </div>
    )
}

Logout.propTypes = {
    user: propTypes.object,
}

export default Logout