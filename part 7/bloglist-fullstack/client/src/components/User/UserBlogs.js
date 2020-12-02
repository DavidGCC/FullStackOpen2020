import React, { useEffect, useState } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'

import usersService from '../../services/users'

const UserBlogs = () => {
    const match = useRouteMatch('/users/:id')
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        if (match) {
            usersService
                .getUserBlogs(match.params.id)
                .then(data => {
                    if (data.length !== 0) {
                        setBlogs(data)
                    } else {
                        setBlogs(null)
                    }
                })
        }
    }, [])
    return (
        <ul>
            {
                blogs === null
                    ? <h3>The user has not added any blogs yet</h3>
                    : blogs.map(blog => {
                        return (
                            <li key={blog.id}>
                                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                            </li>
                        )
                    })
            }
        </ul>
    )
}

export default UserBlogs