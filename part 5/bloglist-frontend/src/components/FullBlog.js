import React from 'react'

const FullBlog = ({ blog, handleLike, handleDelete }) => {

    return (
        <div>
            <p><b>Likes: </b> {blog.likes} <button onClick={() => handleLike(blog)}>Like</button></p>
            <p><b>Created By User:</b> {blog.user.name}</p>
            <button onClick={() => handleDelete(blog)}>Remove</button>
        </div>
    )
}

export default FullBlog