import React from 'react'
import { Link } from 'react-router-dom'
import Logout from '../Authentication/Logout'

const Navbar = () => {
    const itemStyle = {
        marginRight: 20
    }
    return (
        <div style={{ backgroundColor: '#e5e5e5' }}>
            <ul style={{ display: 'flex', listStyleType: 'none' }}>
                <li style={itemStyle}><Link to='/blogs'>Blogs</Link></li>
                <li style={itemStyle}><Link to='/users'>Users</Link></li>
                <Logout />
            </ul>
        </div>
    )
}

export default Navbar