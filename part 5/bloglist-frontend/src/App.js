import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import blogService from './services/blogs'
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        if (window.localStorage.getItem('loggedInUser')) {
            setUser(JSON.parse(window.localStorage.getItem('loggedInUser')));
        } else {
            setUser(null);
        }
    }, [])

    const handleNameChange = (event) => setUsername(event.target.value) 
    const handlePasswordChange = (event) => setPassword(event.target.value)
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login(username, password);

            setUser(user);
            window.localStorage.setItem('loggedInUser', JSON.stringify(user));
            setUsername('');
            setPassword('');
        } catch (error) {
            setUser(null);
            console.error('Wrong credentials');
        }
    }
    const handleLogout = (event) => {
        event.preventDefault();
        if (window.confirm('Are you sure you want to log out?')) {
            window.localStorage.removeItem('loggedInUser');
            setUser(null);
        }
    }

    const loginDisplay = () => {
        return user === null 
        ? <Login 
                username={username} 
                password={password} 
                handleNameChange={handleNameChange} 
                handlePasswordChange={handlePasswordChange} 
                handleLogin={handleLogin} />
        : <Logout name={user.name} handleLogout={handleLogout} />
    }

    return (
        <div>
            {loginDisplay()}
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default App