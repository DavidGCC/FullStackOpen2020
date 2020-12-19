import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { Container } from '@material-ui/core'

// NODE MODEULE IMPORTS END

// COMPONENT IMPORTS

import Blogs from './components/Blog/Blogs'
import FullBlog from './components/Blog/FullBlog'
import UserBlogs from './components/User/UserBlogs'
import Login from './components/Authentication/Login'
import Users from './components/User/Users'
import Navbar from './components/Navbar/Navbar'
import Notification from './components/Notification/Notification'

// COMPONENT IMPORTS END

// REDUCER IMPORTS

import { initializeBlogsAction } from './reducers/blogsReducer'
import { initializeUser } from './reducers/userReducer'
import { getAllUsers } from './reducers/usersReducer'

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

    useEffect(() => {
        dispatch(initializeBlogsAction())
        dispatch(getAllUsers())
        dispatch(initializeUser())
    }, [])
    const blogMatch = useRouteMatch('/blogs/:id')
    const blogId = blogMatch
        ? blogMatch.params.id
        : null
    const userMatch = useRouteMatch('/users/:id')
    const userId = userMatch
        ? userMatch.params.id
        : null
    return (
        <Container maxWidth='xl'>
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
                                    <UserBlogs userId={userId}/>
                                </Route>
                                <Route path='/users'>
                                    <Users />
                                </Route>
                                <Route path={['/', '/blogs']}>
                                    <Blogs blogs={blogs} />
                                </Route>
                            </Switch>
                        </>
                    )
            }
        </Container>
    )
}

export default App