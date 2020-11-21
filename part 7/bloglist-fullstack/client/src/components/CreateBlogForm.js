import React from 'react'
import propTypes from 'prop-types'
import { useField } from '../hooks/index'

const CreateBlogForm = ({ createBlog }) => {

    const title = useField('text')
    const author = useField('text')
    const url = useField('text')
    const handleBlogSubmit = event => {
        event.preventDefault()
        const newBlog = {
            'title': title.input.value,
            'author': author.input.value,
            'url': url.input.value
        }
        createBlog(newBlog)

        title.reset()
        author.reset()
        url.reset()
    }

    return (
        <form onSubmit={handleBlogSubmit}>
            <h2>Create New Blog</h2>
            <label htmlFor='title'>
                Title
                <br />
                <input
                    id="titleInput"
                    {...{ ...title }.input}/>
            </label>
            <br />
            <label htmlFor='author'>
                Author
                <br />
                <input
                    id="authorInput"
                    {...{ ...author }.input}/>
            </label>
            <br />
            <label htmlFor='url'>
                Url
                <br />
                <input
                    id="urlInput"
                    {...{ ...url }.input} />
            </label>
            <br />
            <button id="createButton">Create New Blog</button>
        </form>
    )
}

CreateBlogForm.propTypes = {
    createBlog: propTypes.func
}

export default CreateBlogForm