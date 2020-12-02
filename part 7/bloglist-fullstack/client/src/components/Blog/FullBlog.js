import React, { useState, useEffect } from 'react'
import { likeBlogAction, deleteBlogAction } from '../../reducers/blogsReducer'
import { useDispatch } from 'react-redux'
import blogService from '../../services/blogs'

const FullBlog = ({ blogId }) => {
    const dispatch = useDispatch()
    const [blog, setBlog] = useState(null)
    useEffect(() => {
        blogService
            .getBlog(blogId)
            .then(res => setBlog(res))
            .catch(err => console.error(err))
    }, [blogId])
    const handleLike = blog => dispatch(likeBlogAction(blog))
    const handleDelete = blog => dispatch(deleteBlogAction(blog))
    const buttonStyle = { fontSize: '1rem' }
    if (blog) {

        return (
            <div className='fullBlog'>
                <p><a href={blog.url}>View Full Blog</a></p>
                <p><b>Likes: </b> {blog.likes} <button className='likeButton' style={buttonStyle} onClick={() => handleLike(blog)}>Like</button></p>
                <p><b>Added By User:</b> <a href={`/users/${blog.user.id}`}>{blog.user.name}</a></p>
                <button onClick={() => handleDelete(blog)}>Remove</button>
            </div>
        )
    } else {
        return (
            <h3>Loading...</h3>
        )
    }
}

export default FullBlog