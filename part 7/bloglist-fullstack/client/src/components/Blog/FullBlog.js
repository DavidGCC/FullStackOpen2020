import React from 'react'
import { likeBlogAction, deleteBlogAction, createCommentAction } from '../../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../../hooks/index'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { Typography, Button, TextField, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import PersonIcon from '@material-ui/icons/Person'
import CommentIcon from '@material-ui/icons/Comment'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import AddCommentIcon from '@material-ui/icons/AddComment'


const useStyles = makeStyles({
    container: {
        textAlign: 'center'
    }
})


const FullBlog = ({ blogId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const blog = useSelector(state => state.blogs.find(blog => blog.id === blogId))
    const comment = useField('text')
    const history = useHistory()

    const handleLike = blog => dispatch(likeBlogAction(blog))
    const handleDelete = blog => {
        dispatch(deleteBlogAction(blog))
        history.push('/')
    }

    const submitComment = async (event) => {
        event.preventDefault()
        dispatch(createCommentAction(comment.input.value, blog))
        comment.reset()
    }
    if (blog) {
        return (
            <Grid container className={classes.container} spacing={5} justify='center'>
                <Grid item lg={8}>
                    <Typography component='h2' variant='h2' gutterBottom={true}>
                        {blog.title}
                    </Typography>
                    <Typography component='h4' variant='h4'>
                        Written by {blog.author}
                    </Typography>
                    <Typography>
                        <b>Likes: </b> {blog.likes}
                    </Typography>
                    <Typography gutterBottom={true}>
                        <Button variant='contained' color='primary' startIcon={<ThumbUpIcon />} onClick={() => handleLike(blog)}>Like</Button>
                    </Typography>
                    <Typography>
                        <b>Added By User:</b>
                        <Button component={RouterLink} to={`/users/${blog.user.id}`} startIcon={<PersonIcon />} variant='text' color='primary'>{blog.user.name}</Button>
                    </Typography>
                    <Typography variant='h6' paragraph={true}>
                        <Link target='_blank' rel='noreferrer' href={blog.url}>View Full Blog</Link>
                    </Typography>
                    <Button variant='contained' color='secondary' startIcon={<DeleteForeverIcon />} onClick={() => handleDelete(blog)}>Remove</Button>
                </Grid>
                <Grid container item lg={4} alignContent='center' justify='center'>
                    <Typography variant='h3' component='h3' gutterBottom={true}>
                        Comments
                    </Typography>
                    <form onSubmit={submitComment}>
                        <Grid container spacing={2} alignItems='flex-end'>
                            <Grid item>
                                <TextField id="commentField" label="Add Comment" {...{ ...comment.input }} />
                            </Grid>
                            <Grid item>
                                <Button variant='contained' color='primary' startIcon={<AddCommentIcon />}>Comment</Button>
                            </Grid>
                        </Grid>
                    </form>
                    <List>
                        {blog.comments.map(comment => (
                            <ListItem key={comment.id}>
                                <ListItemIcon>
                                    <CommentIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    {comment.content}
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        )
    } else {
        return (
            <h3>Loading...</h3>
        )
    }
}

export default FullBlog