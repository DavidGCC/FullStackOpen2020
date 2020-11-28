import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

// NODE MODEULE IMPORTS END

// COMPONENT IMPORTS

import Login from './components/Login'
import Logout from './components/Logout'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import TogglableBlog from './components/TogglableBlog'
import FullBlog from './components/FullBlog'
import Users from './components/Users'

// COMPONENT IMPORTS END

// REDUCER IMPORTS

import { initializeBlogsAction } from './reducers/blogsReducer'
import { initializeUser } from './reducers/userReducer'

// REDUCER IMPORTS END


const App = () => {

    const dispatch = useDispatch()

    const blogs = useSelector(state => {
        const sortedState = state.blogs.sort((a, b) => {
            return b.likes - a.likes
        })
        return sortedState
    })
    const user = useSelector(state => state.user)

    const blogFormRef = useRef()


    useEffect(() => { dispatch(initializeBlogsAction()) }, [])
    useEffect(() => { dispatch(initializeUser()) }, [])

    const CreateFormView = () => {
        return (
            <Togglable ref={blogFormRef} defaultButtonText={'Create New Blog'} hiddenButtonText={'Cancel'}>
                <CreateBlogForm />
            </Togglable>
        )
    }
    const BlogView = (blogs) => {
        return (
            blogs.map(blog => (
                <TogglableBlog key={blog.id} title={blog.title} author={blog.author} defaultButtonText='Show' hiddenButtonText='Hide'>
                    <FullBlog blog={blog} />
                </TogglableBlog>
            ))
        )
    }

    return (
        <div>
            <Notification />
            {
                user === null
                    ? <Login />
                    :
                    (
                        <>
                            <Logout user={user} />
                            <Switch>
                                <Route exact path='/'>
                                    {CreateFormView()}
                                    {BlogView(blogs)}
                                </Route>
                                <Route path='/users'>
                                    <Users />
                                </Route>
                            </Switch>
                        </>
                    )
            }
        </div>
    )
}

export default App