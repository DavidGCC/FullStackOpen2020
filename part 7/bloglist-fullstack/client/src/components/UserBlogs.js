import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'

import usersService from '../services/users'

const UserBlogs = () => {
    const match = useRouteMatch('/users/:id')
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        if (match) {
            usersService
                .getUserBlogs(match.params.id)
                .then(data => {
                    setBlogs(data)
                })
        }
    }, [match])
    return (
        <ul>
            {blogs.length === 0
                ? <h3>The user has not added any blogs yet</h3>
                : blogs.map(blog => {
                    return (
                        <li key={blog.id}>
                            <a href={blog.url}>{blog.title}</a>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default UserBlogs