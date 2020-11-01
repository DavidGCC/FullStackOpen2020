import React from 'react';
import CreateBlogField from './CreateBlogField';

const CreateBlogForm = ( { title, author, url, handleAuthorChange, handleTitleChange, handleUrlChange, handleBlogSubmit } ) => {
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

export default CreateBlogForm;