import React from 'react'
import { useField } from '../hooks/index'
import { createBlogAction } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'

const CreateBlogForm = () => {

    const dispatch = useDispatch()

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
        dispatch(createBlogAction(newBlog))


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

export default CreateBlogForm