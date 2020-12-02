import React from 'react'
import { likeBlogAction, deleteBlogAction, createCommentAction } from '../../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../../hooks/index'
import { Link } from 'react-router-dom'

const FullBlog = ({ blogId }) => {
    const dispatch = useDispatch()
    const blog = useSelector(state => state.blogs.find(blog => blog.id === blogId))
    const comment = useField('text')

    const handleLike = blog => dispatch(likeBlogAction(blog))
    const handleDelete = blog => dispatch(deleteBlogAction(blog))

    const submitComment = async (event) => {
        event.preventDefault()
        dispatch(createCommentAction(comment.input.value, blog))
        comment.reset()
    }
    const buttonStyle = { fontSize: '1rem' }
    if (blog) {
        return (
            <div className='fullBlog'>
                <h1>{blog.title}</h1>
                <p>Written by {blog.author}</p>
                <p><a target='_blank' rel='noreferrer' href={blog.url}>View Full Blog</a></p>
                <p><b>Likes: </b> {blog.likes} <button className='likeButton' style={buttonStyle} onClick={() => handleLike(blog)}>Like</button></p>
                <p><b>Added By User:</b> <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link></p>
                <h3>Comments</h3>
                <form onSubmit={submitComment}>
                    <label htmlFor='comment'>Leave a comment: </label>
                    <input {...{ ...comment.input }} />
                    <button>COMMENT</button>
                </form>
                <ul>
                    {blog.comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
                </ul>
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