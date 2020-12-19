import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { useSelector } from 'react-redux'

const Users = () => {
    const users = useSelector(state => state.users)
    if (users) {
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
                            <tr key={user.id}>
                                <td><Link component={RouterLink} to={`/users/${user.id}`}>{user.name}</Link></td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    } else {
        return <h3>Loading...</h3>
    }
}

export default Users