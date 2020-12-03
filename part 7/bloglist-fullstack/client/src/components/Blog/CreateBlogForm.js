import React from 'react'
import { useField } from '../../hooks/index'
import { createBlogAction } from '../../reducers/blogsReducer'
import { useDispatch } from 'react-redux'
import { FormControl, TextField, Button } from '@material-ui/core'

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
            <FormControl>
                <TextField margin='dense' id="create-title" label="Title" variant="outlined" value={title.input.value} onChange={title.input.onChange} />
                <TextField margin='dense' id="create-title" label="Author" variant="outlined" value={author.input.value} onChange={author.input.onChange} />
                <TextField margin='dense' id="create-title" label="Link to blog" variant="outlined" value={url.input.value} onChange={url.input.onChange} />
                <Button type='submit' variant='contained' color='primary' id='createButton'>Create New Blog</Button>
            </FormControl>
        </form>
    )
}

export default CreateBlogForm