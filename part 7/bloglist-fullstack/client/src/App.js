import React, { useEffect, useRef } from 'react'

import Login from './components/Login'
import Logout from './components/Logout'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import TogglableBlog from './components/TogglableBlog'
import FullBlog from './components/FullBlog'


import { initializeBlogsAction } from './reducers/blogsReducer'
import { initializeUser } from './reducers/userReducer'

import { useSelector, useDispatch } from 'react-redux'

const App = () => {

    const dispatch = useDispatch()

    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    const blogFormRef = useRef()


    useEffect(() => {dispatch(initializeBlogsAction())}, [])
    useEffect(() => {dispatch(initializeUser())}, [])

    const CreateFormView = () => {
        return (
            <Togglable ref={blogFormRef} defaultButtonText={'Create New Blog'} hiddenButtonText={'Cancel'}>
                <CreateBlogForm  />
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
                    <FullBlog blog={blog} />
                </TogglableBlog>
            ))
        )
    }
    const display = () => {
        return user === null
            ? <Login />
            : (
                <div>
                    <Logout {...{ user }} />
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
            <Notification />
            {display()}
        </div>
    )
}

export default App