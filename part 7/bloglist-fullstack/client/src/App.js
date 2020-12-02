import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

// NODE MODEULE IMPORTS END

// COMPONENT IMPORTS

import Blog from './components/Blog/Blog'
import FullBlog from './components/Blog/FullBlog'
import CreateBlogForm from './components/Blog/CreateBlogForm'
import Togglable from './components/Togglables/Togglable'
import UserBlogs from './components/User/UserBlogs'
import Login from './components/Authentication/Login'
import Users from './components/User/Users'
import Navbar from './components/Navbar/Navbar'
import Notification from './components/Notification/Notification'

// COMPONENT IMPORTS END

// REDUCER IMPORTS

import { initializeBlogsAction } from './reducers/blogsReducer'
import { initializeUser } from './reducers/userReducer'

// REDUCER IMPORTS END


const App = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const blogs = useSelector(state => {
        const sortedState = state.blogs.sort((a, b) => {
            return b.likes - a.likes
        })
        return sortedState
    })
    const blogMatch = useRouteMatch('/blogs/:id')
    useEffect(() => {
        dispatch(initializeBlogsAction())
        dispatch(initializeUser())
    }, [])

    const blogFormRef = useRef()


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
                <Blog key={blog.id} blog={blog} />
            ))
        )
    }


    const blogId = blogMatch
        ? blogMatch.params.id
        : null
    return (
        <div>
            <Notification />
            {
                user === null
                    ? <Login />
                    :
                    (
                        <>
                            <Navbar />
                            <Switch>
                                <Route path='/blogs/:id'>
                                    <FullBlog blogId={blogId}/>
                                </Route>
                                <Route path='/users/:id'>
                                    <UserBlogs />
                                </Route>
                                <Route path='/users'>
                                    <Users />
                                </Route>
                                <Route path={['/', '/blogs']}>
                                    {CreateFormView()}
                                    {BlogView(blogs)}
                                </Route>
                            </Switch>
                        </>
                    )
            }
        </div>
    )
}

export default App