import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { useSelector } from 'react-redux'
import { Typography, Container, TableContainer, TableHead, TableRow, TableCell, TableBody, Table } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    container: {
        margin: '0 auto',
        width: '50%%'
    },
    table: {
        width: '50%',
        margin: '0 auto'
    }
})


const Users = () => {
    const users = useSelector(state => state.users)
    const classes = useStyles()
    if (users) {
        return (
            <Container className={classes.container}>
                <TableContainer className={classes.table}>
                    <Typography variant='h3' component='h3'>Users</Typography>
                    <Table>
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
                    </Table>
                </TableContainer>
            </Container>
        )
    } else {
        return <Typography variant='h3' component='h3'>Loading...</Typography>
    }
}

export default Users