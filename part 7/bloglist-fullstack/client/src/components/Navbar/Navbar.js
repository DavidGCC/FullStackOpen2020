import React from 'react'
import Logout from '../Authentication/Logout'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText, Container } from '@material-ui/core'
import { Home } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    navDisplayFlex: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    linkText: {
        textDecoration: 'none',
        textTransform: 'uppercase',
        color: 'white'
    },
    displayLogout: {
        marginLeft: 'auto',
    },
    appContainer: {
        marginBottom: '0.5rem'
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

const Navbar = () => {
    const history = useHistory()
    const classes = useStyles()
    const navLinks = [
        { 'title': 'Blogs', 'path': '/' },
        { 'title': 'Users', 'path': '/users' }
    ]
    return (
        <AppBar position='sticky' className={classes.appContainer}>
            <Toolbar>
                <IconButton edge='start' color='inherit' aria-label='home' onClick={() => history.push('/')} >
                    <Home fontSize='large'></Home>
                </IconButton>
                <Container maxWidth={false} className={classes.container}>
                    <List component="nav" aria-labelledby='navigation' className={classes.navDisplayFlex}>
                        {navLinks.map(link => (
                            <Link className={classes.linkText} key={link.title} component={RouterLink} to={link.path}>
                                <ListItem button>
                                    <ListItemText primary={link.title} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                    <Logout />
                </Container>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar