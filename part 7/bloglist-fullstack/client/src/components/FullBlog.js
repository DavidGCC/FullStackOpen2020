import React from 'react'
import { likeBlogAction, deleteBlogAction } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'

const FullBlog = ({ blog }) => {

    const dispatch = useDispatch()
    const handleLike = blog => dispatch(likeBlogAction(blog))
    const handleDelete = blog => dispatch(deleteBlogAction(blog))

    const buttonStyle = { fontSize: '1rem' }

    return (
        <div className='fullBlog'>
            <p><b>URL:</b> {blog.url}</p>
            <p><b>Likes: </b> {blog.likes} <button className='likeButton' style={buttonStyle} onClick={() => handleLike(blog)}>Like</button></p>
            <p><b>Created By User:</b> {blog.user.name}</p>
            <button onClick={() => handleDelete(blog)}>Remove</button>
        </div>
    )
}

export default FullBlog