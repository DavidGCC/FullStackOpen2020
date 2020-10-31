import React from 'react';


const Login = ( { username, password, handleNameChange, handlePasswordChange, handleLogin } ) => {
    return (
        <form onSubmit={handleLogin}>
            <h2>Log in to application</h2>
            <label htmlFor='username'>
                Username
                <br />
                <input
                    type='text'
                    value={username}
                    onChange={handleNameChange}></input>
            </label>
            <br />
            <label htmlFor='password'>
                Password
                <br />
                <input
                    type='password'
                    value={password}
                    onChange={handlePasswordChange}></input>
            </label>
            <br />
            <button>Submit</button>
        </form>
    )
}

export default Login;