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
            <p><a href={blog.url}>View Full Blog</a></p>
            <p><b>Likes: </b> {blog.likes} <button className='likeButton' style={buttonStyle} onClick={() => handleLike(blog)}>Like</button></p>
            <p><b>Added By User:</b> <a href={`/users/${blog.user.id}`}>{blog.user.name}</a></p>
            <button onClick={() => handleDelete(blog)}>Remove</button>
        </div>
    )
}

export default FullBlog