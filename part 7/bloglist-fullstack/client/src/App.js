import React, { useEffect, useRef } from 'react'

import Login from './components/Login'
import Logout from './components/Logout'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import TogglableBlog from './components/TogglableBlog'
import FullBlog from './components/FullBlog'


import { initializeBlogsAction, createBlogAction, likeBlogAction, deleteBlogAction } from './reducers/blogsReducer'
import { loginAction, logoutAction, initializeUser } from './reducers/userReducer'

import { useSelector, useDispatch } from 'react-redux'

const App = () => {

    const dispatch = useDispatch()

    const blogs = useSelector(state => state.blogs)
    const notification = useSelector(state => state.notification)
    const user = useSelector(state => state.user)

    const blogFormRef = useRef()


    useEffect(() => {
        dispatch(initializeBlogsAction())
    }, [])

    useEffect(() => {
        dispatch(initializeUser())
    }, [])


    const login = async (username, password) => dispatch(loginAction(username, password))

    const handleLogout = (event) => {
        event.preventDefault()
        if (window.confirm('Are you sure you want to log out?')) {
            dispatch(logoutAction(user.name))
        }
    }

    const createBlog = async blog => dispatch(createBlogAction(blog))

    const handleLike = async (blog) => dispatch(likeBlogAction(blog))

    const handleDelete = async (blog) => dispatch(deleteBlogAction(blog))

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