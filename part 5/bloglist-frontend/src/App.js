import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');
    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
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

    const LoginForm = () => {
        return user === null 
        ? <Login 
                username={username} 
                password={password} 
                handleNameChange={handleNameChange} 
                handlePasswordChange={handlePasswordChange} 
                handleLogin={handleLogin} />
        : (
            <h3>{user.name} is Logged In</h3>
        )
    }

    return (
        <div>
            {LoginForm()}
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default App