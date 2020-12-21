import React from 'react'
import propTypes from 'prop-types'
import { Table, TableCell, TableContainer, TableBody, Paper, TableRow, TableHead, Typography, Grid } from '@material-ui/core'
import CreateBlogForm from './CreateBlogForm'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    columnHead: {
        fontSize: '1.4rem'
    },
    grid: {
        width: '80vw',
        margin: '0 auto'
    }
})

const Blogs = ({ blogs }) => {
    const classes = useStyles()
    return (
        <Grid container className={classes.grid} spacing={2} justify='center'>
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
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.columnHead}>Title</TableCell>
                                <TableCell className={classes.columnHead}>User</TableCell>
                            </TableRow>
                        </TableHead>
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
