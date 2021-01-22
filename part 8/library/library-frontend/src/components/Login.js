import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../Queries';



const Login = ({ show, setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, result] = useMutation(LOGIN);

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;
            setToken(token);
            localStorage.setItem('currentUserToken', token);
            localStorage.setItem('currentUser', JSON.stringify({
                username: result.data.login.user.username,
                favoriteGenre: result.data.login.user.favoriteGenre
            }));
        }
    }, [result.data]) // eslint-disable-line

    if (!show || localStorage.getItem('currentUserToken')) {
        return null;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        login({ variables: { username, password } });
        setPassword('');
        setUsername('');
    }



    return (
        <form onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <input type='text' value={username} onChange={({ target }) => setUsername(target.value)}></input>
            <br />
            <label htmlFor='password'>Password</label>
            <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}></input>
            <button>Login</button>
        </form>
    )
}

export default Login;