import React from 'react'
import propTypes from 'prop-types'
import { Table, TableCell, TableContainer, TableBody, Paper, TableRow, Typography, Grid } from '@material-ui/core'
import CreateBlogForm from './CreateBlogForm'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'



const Blogs = ({ blogs }) => {
    return (
        <Grid container mt={3}>
            <Grid item lg={2}>
                <Typography variant='h2' component='h2'>Create</Typography>
                <CreateBlogForm />
            </Grid>
            <Grid item lg={10}>
                <Typography variant='h2' component='h2'>
                    Blogs
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {
                                blogs.map(blog => (
                                    <TableRow key={blog.id}>
                                        <TableCell>
                                            <Link component={RouterLink} to={`/blogs/${blog.id}`}>{blog.title}</Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link component={RouterLink} to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

Blogs.propTypes = {
    blogs: propTypes.array.isRequired,
}

export default Blogs
