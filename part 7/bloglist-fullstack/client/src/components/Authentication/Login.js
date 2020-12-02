import React, { useState } from 'react'
import { loginAction } from '../../reducers/userReducer'
import { useDispatch } from 'react-redux'

const Login = () => {

    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleNameChange = event => setUsername(event.target.value)
    const handlePasswordChange = event => setPassword(event.target.value)

    const handleLogin = (event) => {
        event.preventDefault()
        dispatch(loginAction(username, password))
    }

    return (
        <form onSubmit={handleLogin}>
            <h2>Log in to application</h2>
            <label htmlFor='username'>
                Username
                <br />
                <input
                    type='text'
                    id="username"
                    value={username}
                    onChange={handleNameChange}></input>
            </label>
            <br />
            <label htmlFor='password'>
                Password
                <br />
                <input
                    type='password'
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}></input>
            </label>
            <br />
            <button id="loginButton">Login</button>
        </form>
    )
}

export default Login