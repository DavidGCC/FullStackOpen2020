import React, { useState } from 'react'
import propTypes from 'prop-types'

const Login = ( { login } ) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleNameChange = event => setUsername(event.target.value)
    const handlePasswordChange = event => setPassword(event.target.value)

    const handleLogin = (event) => {
        event.preventDefault()
        login(username, password)
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

Login.propTypes = {
    login: propTypes.func.isRequired
}

export default Login