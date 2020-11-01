import React from 'react';

const CreateBlogField = ( { text, value, handleChange } ) => {
    return (
        <div>
            <label htmlFor={text}>
                {text}
                <br />
                <input 
                    type='text'
                    name={text}
                    value={value}
                    onChange={handleChange} />
            </label>
            <br />
        </div>
    )
}

export default CreateBlogField;