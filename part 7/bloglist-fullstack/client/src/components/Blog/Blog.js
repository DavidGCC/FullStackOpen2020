import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

    const style = { fontSize: '1.5rem',
        fontFamily: 'sans-serif',
        border: '1px solid black',
        width: 1500, padding: 10,
        boxSizing: 'border-box',
        marginBottom: 10 }


    return (
        <div style={style}>
            <p className='shortBlog'>
                <b><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></b> by <b>{blog.author}</b>
            </p>
        </div>
    )
}

Blog.propTypes = {
    blog: propTypes.object.isRequired,
}

export default Blog
