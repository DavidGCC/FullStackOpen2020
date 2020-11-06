import React, { useState } from 'react'
import propTypes from 'prop-types';

const Blog = ({ blog, handleLike, handleDelete }) => {

    const style = { fontSize: '1.5rem', fontFamily: 'sans-serif', border: '1px solid black', width: 1500, padding: 10, boxSizing: 'border-box', marginBottom: 10 }
    const buttonStyle = { fontSize: '1rem' }
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => setVisible(!visible);

    return (
        <div style={style}>
            <p><b>{blog.title}</b> by <b>{blog.author}</b> <button style={buttonStyle} onClick={toggleVisibility}>{visible ? 'Hide' : 'Show'}</button></p>
            {visible && (
                <div>
                    <p>{blog.url}</p>
                    <p>Likes: {blog.likes} <button onClick={() => handleLike(blog)} style={buttonStyle}>Like</button></p>
                    <p>Created by User: {blog.user.name}</p>
                    <button onClick={() => handleDelete(blog)}>Remove</button>
                </div>
            )}
        </div>
    )
}

Blog.propTypes = {
    blog: propTypes.object.isRequired,
    handleDelete: propTypes.func.isRequired,
    handleLike: propTypes.func.isRequired
}

export default Blog
