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
            <CreateBlogField text='Title' value={title} handleChange={handleTitleChange} />
            <CreateBlogField text='Author' value={author} handleChange={handleAuthorChange} />
            <CreateBlogField text='Url' value={url} handleChange={handleUrlChange} />
            <br />
            <button>Create New Blog</button>
        </form>
    )
}

CreateBlogField.propTypes = {
    createBlog: propTypes.func
}

export default CreateBlogForm