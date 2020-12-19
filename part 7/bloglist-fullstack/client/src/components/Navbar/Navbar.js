import React from 'react'
import Logout from '../Authentication/Logout'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText, } from '@material-ui/core'
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
    }
})

const Navbar = () => {
    // const itemStyle = {
    //     marginRight: 20
    // }
    const classes = useStyles()
    const navLinks = [
        { 'title': 'Blogs', 'path': '/' },
        { 'title': 'Users', 'path': '/users' }
    ]
    return (
        // <div style={{ backgroundColor: '#e5e5e5' }}>
        //     <ul style={{ display: 'flex', listStyleType: 'none' }}>
        //         <li style={itemStyle}><Link component={RouterLink} to='/blogs'>Blogs</Link></li>
        //         <li style={itemStyle}><Link component={RouterLink} to='/users'>Users</Link></li>
        //         <Logout />
        //     </ul>
        // </div>
        <AppBar position='static'>
            <Toolbar>
                <IconButton edge='start' color='inherit' aria-label='home'>
                    <Home fontSize='large' />
                </IconButton>
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
            </Toolbar>
        </AppBar>
    )
}

export default Navbar