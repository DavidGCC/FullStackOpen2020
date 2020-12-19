import React, { useEffect, useState } from 'react'
import usersService from '../../services/users'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        usersService
            .getAllUserData()
            .then(data => setUsers(data))
    }, [])
    return (
        <table>
            <caption>Users</caption>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Blogs Created</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => {
                    return (
                        <tr key={user.name}>
                            <td><Link component={RouterLink} to={`/users/${user.id}`}>{user.name}</Link></td>
                            <td>{user.blogCount}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Users