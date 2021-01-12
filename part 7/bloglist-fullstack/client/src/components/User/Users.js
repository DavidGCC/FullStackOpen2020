import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { useSelector } from 'react-redux'
import { Typography, Grid, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'


const Users = () => {
    const users = useSelector(state => state.users)
    if (users) {
        return (
            <Grid container justify='center'>
                <TableContainer>
                    <Typography variant='h3' component='h3'>Users</Typography>
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Blogs Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => {
                            return (
                                <TableRow key={user.id}>
                                    <TableCell><Link component={RouterLink} to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                                    <TableCell>{user.blogs.length}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </TableContainer>
            </Grid>
        )
    } else {
        return <h3>Loading...</h3>
    }
}

export default Users