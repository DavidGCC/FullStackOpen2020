import React, { useEffect, useState } from 'react'
import usersService from '../services/users'

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
                            <td><a href={`/users/${user.id}`}>{user.name}</a></td>
                            <td>{user.blogCount}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Users