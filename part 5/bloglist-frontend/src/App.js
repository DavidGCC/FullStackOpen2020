import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import CreateBlogForm from './components/CreateBlogForm'

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
        } catch (error) {
            setUser(null);
            console.error('Wrong credentials');
        }
    }
    const handleLogout = (event) => {
        event.preventDefault();
        if (window.confirm('Are you sure you want to log out?')) {
            window.localStorage.removeItem('CU');
            setUser(null);
        }
    }
    const handleBlogSubmit = async event => {
        event.preventDefault();
        const data = await blogService.createBlog({
            'title': title,
            'author': author,
            'url': url
        });
        const newBlogs = blogs.concat(data);
        setBlogs(newBlogs);
        setTitle('');
        setAuthor('');
        setUrl('');
    }

    const loginDisplay = () => {
        return user === null 
        ? <Login {...{username, password, handleNameChange, handlePasswordChange, handleLogin}} />
        : (
            <div>
                <Logout {...{user, handleLogout}} />
                <br />
                <CreateBlogForm {...{author, title, url, handleAuthorChange, handleTitleChange, handleUrlChange, handleBlogSubmit}} />
                <h2>Added Blogs</h2>
                { blogs.map(blog => <Blog key={blog.id} blog={blog} />) }
            </div>
        )
    }

    return (
        <div>
            <h1>Bloglist</h1>
            {loginDisplay()}
        </div>
    )
}

export default App