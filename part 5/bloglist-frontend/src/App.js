import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState(null);

    const blogFormRef = useRef();

    const clearMessage = () => setTimeout(() => setMessage(null), 5000);

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem('CU');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            setUser(user);
            blogService.setToken(user.token)
        }
    }, [])

    const handleNameChange = (event) => setUsername(event.target.value) 
    const handlePasswordChange = (event) => setPassword(event.target.value)
    const handleTitleChange = (event) => setTitle(event.target.value)
    const handleAuthorChange = event => setAuthor(event.target.value)
    const handleUrlChange = event => setUrl(event.target.value)

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login(username, password);

            setUser(user);
            window.localStorage.setItem('CU', JSON.stringify(user));
            blogService.setToken(user.token);
            setUsername('');
            setPassword('');
            setMessage({success: true, text: `${user.name} successfully logged in`});
            clearMessage();
        } catch (error) {
            setUser(null);
            console.error('Wrong credentials');
            setMessage({error: true, text: `Wrong Username or Password.`});
            clearMessage();
        }
    }
    const handleLogout = (event) => {
        event.preventDefault();
        if (window.confirm('Are you sure you want to log out?')) {
            window.localStorage.removeItem('CU');
            setMessage({succes: true, text: `${user.name} logged out successfully.`});
            clearMessage();
            setUser(null);
        }
    }
    const handleBlogSubmit = async event => {
        event.preventDefault();
        try {
            const data = await blogService.createBlog({
                'title': title,
                'author': author,
                'url': url
            });
            const newBlogs = blogs.concat(data);
            setBlogs(newBlogs);
            setMessage({success: true, text: `Created a new blog ${data.title} by ${data.author}.`});
            blogFormRef.current.toggleVisibility();
            clearMessage();
        } catch (error) {
            setMessage({error: true, text: `Couldn't create new blog message: ${error.message}`})
            clearMessage();
        }
        setTitle('');
        setAuthor('');
        setUrl('');
    }

    const display = () => {
        return user === null 
        ? <Login {...{username, password, handleNameChange, handlePasswordChange, handleLogin}} />
        : (
            <div>
                <Logout {...{user, handleLogout}} />
                <br />
                <Togglable ref={blogFormRef}>
                    <CreateBlogForm {...{author, title, url, handleAuthorChange, handleTitleChange, handleUrlChange, handleBlogSubmit}} />
                </Togglable>
                <h2>Added Blogs</h2>
                { blogs.map(blog => <Blog key={blog.id} blog={blog} />) }
            </div>
        )
    }

    return (
        <div>
            <h1>Bloglist</h1>
            { message && <Notification {...{message}} />}
            {display()}
        </div>
    )
}

export default App