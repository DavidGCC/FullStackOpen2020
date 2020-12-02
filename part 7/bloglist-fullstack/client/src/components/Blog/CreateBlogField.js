import React from 'react'
import propTypes from 'prop-types'


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

CreateBlogField.propTypes = {
    text: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    handleChange: propTypes.func.isRequired
}

export default CreateBlogField