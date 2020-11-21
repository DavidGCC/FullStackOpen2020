import React, { useState, useEffect, useRef } from 'react'

import Login from './components/Login'
import Logout from './components/Logout'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import TogglableBlog from './components/TogglableBlog'
import FullBlog from './components/FullBlog'

import blogService from './services/blogs'
import loginService from './services/login'

import { initializeBlogsAction, createBlogAction, likeBlogAction, deleteBlogAction } from './reducers/blogsReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {

    const dispatch = useDispatch()

    const blogs = useSelector(state => state.blogs)
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)

    const blogFormRef = useRef()

    const clearMessage = () => setTimeout(() => setMessage(null), 5000)

    useEffect(() => {
        dispatch(initializeBlogsAction())
    }, [])

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem('CU')
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])


    const login = async (username, password) => {
        try {
            const user = await loginService.login(username, password)
            setUser(user)
            window.localStorage.setItem('CU', JSON.stringify(user))
            blogService.setToken(user.token)

            setMessage({ success: true, text: `${user.name} successfully logged in` })
            clearMessage()
        } catch (error) {
            setMessage({ error: true, text: 'Wrong Username or Password.' })
            clearMessage()
        }
    }
    const handleLogout = (event) => {
        event.preventDefault()
        if (window.confirm('Are you sure you want to log out?')) {
            window.localStorage.removeItem('CU')
            setUser(null)
        }
    }

    const createBlog = async blog => {
        try {
            dispatch(createBlogAction(blog))

            setMessage({ success: true, text: `Created new blog ${blog.title} by ${blog.author}` })
            clearMessage()
        } catch (error) {
            setMessage({ error: true, text: `Couldn't create blog. Message: ${error.message}` })
            clearMessage()
        }
    }

    const handleLike = async (blog) => {
        try {
            dispatch(likeBlogAction(blog))
            setMessage({ success: true, text: `Liked blog ${blog.title}.` })
            clearMessage()
        } catch (error) {
            setMessage({ error: true, text: `Couldn't like blog ${blog.title}. Message: ${error.response.data.error}` })
            clearMessage()
        }
    }

    const handleDelete = async (blog) => {
        try {
            dispatch(deleteBlogAction(blog))
            setMessage({ success: true, text: `Successfully deleted blog ${blog.title} by ${blog.author}` })
            clearMessage()
        } catch (error) {
            setMessage({ error: true, text: `Couldn't delete blog ${blog.title}. Message: ${error.response.data.error}` })
            clearMessage()
        }
    }
    const CreateFormView = () => {
        return (
            <Togglable ref={blogFormRef} defaultButtonText={'Create New Blog'} hiddenButtonText={'Cancel'}>
                <CreateBlogForm {...{ createBlog }} />
            </Togglable>
        )
    }
    const BlogView = (blogs) => {
        blogs.sort((a, b) => {
            return b.likes - a.likes
        })
        return (
            blogs.map(blog => (
                <TogglableBlog key={blog.id} title={blog.title} author={blog.author} defaultButtonText='Show' hiddenButtonText='Hide'>
                    <FullBlog blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
                </TogglableBlog>
            ))
        )
    }
    const display = () => {
        return user === null
            ? <Login login={login} />
            : (
                <div>
                    <Logout {...{ user, handleLogout }} />
                    <br />
                    {CreateFormView()}
                    <h2>Added Blogs</h2>
                    {BlogView(blogs)}
                </div>
            )
    }

    return (
        <div>
            <h1>Bloglist</h1>
            { message && <Notification {...{ message }} />}
            {display()}
        </div>
    )
}

export default App