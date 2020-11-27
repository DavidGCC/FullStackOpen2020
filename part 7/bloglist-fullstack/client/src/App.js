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
import { createSuccessMessage, createErrorMessage } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {

    const dispatch = useDispatch()

    const blogs = useSelector(state => state.blogs)
    const notification = useSelector(state => state.notification)
    const [user, setUser] = useState(null)

    const blogFormRef = useRef()


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

            dispatch(createSuccessMessage(`${user.name} successfully logged in`))
        } catch (error) {
            dispatch(createErrorMessage('Wrong Username or Password.'))
        }
    }
    const handleLogout = (event) => {
        event.preventDefault()
        if (window.confirm('Are you sure you want to log out?')) {
            window.localStorage.removeItem('CU')
            dispatch(createSuccessMessage(`${user.name} Successfully logged out.`))
            setUser(null)
        }
    }

    const createBlog = async blog => {
        try {
            dispatch(createBlogAction(blog))

            dispatch(createSuccessMessage(`Created new blog ${blog.title} by ${blog.author}`))
        } catch (error) {
            dispatch(createErrorMessage(`Couldn't create blog. Message: ${error.message}`))
        }
    }

    const handleLike = async (blog) => {
        try {
            dispatch(likeBlogAction(blog))
            dispatch(createSuccessMessage(`Liked blog ${blog.title}.`))
        } catch (error) {
            dispatch(createErrorMessage(`Couldn't like blog ${blog.title}. Message: ${error.response.data.error}`))
        }
    }

    const handleDelete = async (blog) => {
        try {
            dispatch(deleteBlogAction(blog))
            dispatch(createSuccessMessage(`Successfully deleted blog ${blog.title} by ${blog.author}`))
        } catch (error) {
            dispatch(createErrorMessage(`Couldn't delete blog ${blog.title}. Message: ${error.response.data.error}`))
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
            { notification.message && <Notification usage={notification.usage} message={notification.message} />}
            {display()}
        </div>
    )
}

export default App