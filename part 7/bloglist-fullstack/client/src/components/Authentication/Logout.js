import React from 'react'
import { logoutAction } from '../../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import propTypes from 'prop-types'
import { Menu, MenuItem, IconButton, Typography, ListItemIcon, ListItemText } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonIcon from '@material-ui/icons/Person'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    menu: {
        marginTop: '2rem'
    },
    bottomBorder: {
        borderBottom: '1px solid gray'
    }
})

const Logout = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const user = useSelector(state => state.user)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const handleLogout = (event) => {
        event.preventDefault()
        if (window.confirm('Are you sure you want to log out?')) {
            dispatch(logoutAction(user.name))
        }
    }
    const toggleMenu = event => {
        if (anchorEl === null) {
            setAnchorEl(event.currentTarget)
        } else {
            setAnchorEl(null)
        }
    }
    return (
        <div>
            <IconButton onClick={toggleMenu} color='inherit'>
                <AccountCircleIcon fontSize='large'></AccountCircleIcon>
            </IconButton>
            <Menu open={Boolean(anchorEl)} onClose={toggleMenu} anchorEl={anchorEl} className={classes.menu}>
                <MenuItem className={classes.bottomBorder}>
                    <Typography variant="p" component="p">{user.name} Logged In</Typography>
                </MenuItem>
                <MenuItem component={RouterLink} to={`/users/${user.id}`}>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary='My Page' />
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary='Logout' />
                </MenuItem>
            </Menu>
        </div>
    )
}

Logout.propTypes = {
    user: propTypes.object,
}

export default Logout