import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { useSelector } from 'react-redux'

const Userblogs = ({ userId }) => {
    const user = useSelector(state => state.users.find(user => {
        if (user.id === userId) {
            return user
        }
    }))
    if (user) {
        return (
            <ul>
                {
                    user.blogs.length === 0
                        ? <h3>The user has not added any user.blogs yet</h3>
                        : user.blogs.map(blog => {
                            return (
                                <li key={blog.id}>
                                    <Link component={RouterLink} to={`/blogs/${blog.id}`}>{blog.title}</Link>
                                </li>
                            )
                        })
                }
            </ul>
        )
    } else {
        return <h2>Loading ...</h2>
    }
}

export default Userblogs