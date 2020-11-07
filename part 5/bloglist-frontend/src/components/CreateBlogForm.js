import React, { useState } from 'react'
import CreateBlogField from './CreateBlogField'
import propTypes from 'prop-types'

const CreateBlogForm = ({ createBlog }) => {

    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = (event) => setTitle(event.target.value)
    const handleAuthorChange = event => setAuthor(event.target.value)
    const handleUrlChange = event => setUrl(event.target.value)

    const handleBlogSubmit = event => {
        event.preventDefault()
        createBlog({
            'title': title,
            'author': author,
            'url': url
        })

        setAuthor('')
        setTitle('')
        setUrl('')
    }

    return (
        <form onSubmit={handleBlogSubmit}>
            <h2>Create New Blog</h2>
            <label htmlFor='title'>
                Title
                <br />
                <input
                    id="titleInput"
                    type='text'
                    name='title'
                    value={title}
                    onChange={handleTitleChange} />
            </label>
            <br />
            <label htmlFor='author'>
                Author
                <br />
                <input
                    id="authorInput"
                    type='text'
                    name='author'
                    value={author}
                    onChange={handleAuthorChange} />
            </label>
            <br />
            <label htmlFor='url'>
                Url
                <br />
                <input
                    id="urlInput"
                    type='text'
                    name='url'
                    value={url}
                    onChange={handleUrlChange} />
            </label>
            <br />
            <button id="createButton">Create New Blog</button>
        </form>
    )
}

CreateBlogField.propTypes = {
    createBlog: propTypes.func
}

export default CreateBlogForm