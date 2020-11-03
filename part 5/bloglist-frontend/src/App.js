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
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);

    const blogFormRef = useRef();

    const clearMessage = () => setTimeout(() => setMessage(null), 5000);

    useEffect(() => { blogService.getAll().then(blogs =>setBlogs(blogs)) }, [])

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem('CU');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            setUser(user);
            blogService.setToken(user.token)
        }
    }, [])


    const login = async (username, password) => {
        try {
            const user = await loginService.login(username, password);
            setUser(user);
            window.localStorage.setItem('CU', JSON.stringify(user));
            blogService.setToken(user.token);

            setMessage({success: true, text: `${user.name} successfully logged in`});
            clearMessage();
        } catch (error) {
            setMessage({error: true, text: `Wrong Username or Password.`});
            clearMessage();
        }
    }
    const handleLogout = (event) => {
        event.preventDefault();
        if (window.confirm('Are you sure you want to log out?')) {
            window.localStorage.removeItem('CU');
            setUser(null);
        }
    }
    
    const createBlog = async blog => {
        try {
            const response = await blogService.createBlog(blog);
            setBlogs(blogs.concat(response));

            setMessage({success: true, text: `Created new blog ${blog.title} by ${blog.author}`});
            clearMessage();
        } catch (error) {
            setMessage({error: true, text: `Couldn't create blog. Message: ${error.message}`})
            clearMessage();
        }
    }

    const handleLike = async (blog) => {
        try {
            await blogService.like(blog);
            const response = await blogService.getAll();
            setBlogs(response);
        } catch (error) {
            setMessage({error: true, text: `Couldn't like blog ${blog.title}. Message: ${error.response.data.error}`});
            clearMessage();
        }
    }

    const display = () => {
        return user === null 
        ? <Login login={login} />
        : (
            <div>
                <Logout {...{user, handleLogout}} />
                <br />
                <Togglable ref={blogFormRef}>
                    <CreateBlogForm {...{createBlog}} />
                </Togglable>
                <h2>Added Blogs</h2>
                { blogs.map(blog => <Blog key={blog.id} blog={blog} handleLike={handleLike} />) }
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