import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Typography, Container, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LinkIcon from '@material-ui/icons/Link'

const useStlyes = makeStyles({
    listItem: {
        width: '100%'
    },
    container: {
        textAlign: 'center'
    },
    list: {
        width: '60%',
        margin: '0 auto'
    }
})


const Userblogs = ({ userId }) => {
    const classes = useStlyes()
    const user = useSelector(state => state.users.find(user => {
        if (user.id === userId) {
            return user
        }
    }))
    if (user) {
        return (
            <Container className={classes.container}>
                <Typography component='h2' variant='h2' className={classes.header}>
                    {user.name[user.name.length - 1] === 's' ? `${user.name}' Blogs` : `${user.name}'s Blogs`}
                </Typography>
                <List className={classes.list}>
                    {
                        user.blogs.length === 0
                            ? <Typography container='h3' varaint='h3'>The user has not added any blogs yet</Typography>
                            : user.blogs.map(blog => {
                                return (
                                    <ListItem button className={classes.listItem} key={blog.id} component={RouterLink} to={`/blogs/${blog.id}`}>
                                        <ListItemIcon>
                                            <LinkIcon />
                                        </ListItemIcon>
                                        <ListItemText>
                                            {blog.title}
                                        </ListItemText>
                                    </ListItem>
                                )
                            })
                    }
                </List>
            </Container>
        )
    } else {
        return <h2>Loading ...</h2>
    }
}

export default Userblogs