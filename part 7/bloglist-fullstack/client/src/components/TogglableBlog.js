import React, { useState } from 'react'
import propTypes from 'prop-types'


const TogglableBlog = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const buttonStyle = { fontSize: '1rem' }
    const style = { fontSize: '1.5rem', fontFamily: 'sans-serif', border: '1px solid black', width: 1500, padding: 10, boxSizing: 'border-box', marginBottom: 10 }

    const toggleVisibility = () => setVisible(!visible)


    return (
        <div style={style}>
            <div className="shortBlog" style={hideWhenVisible}>
                <p>
                    <b>{props.title}</b> by <b>{props.author}</b>
                    <button style={buttonStyle} onClick={toggleVisibility}>{props.defaultButtonText}</button>
                </p>
            </div>
            <div style={showWhenVisible} className='togglableContent fullBlog'>
                <p>
                    <b>{props.title}</b> by <b>{props.author}</b>
                    <button style={buttonStyle} onClick={toggleVisibility}>{props.hiddenButtonText}</button>
                </p>
                {props.children}
                <br />
            </div>
        </div>

    )
}

TogglableBlog.propTypes = {
    title: propTypes.string.isRequired,
    author: propTypes.string.isRequired,
    defaultButtonText: propTypes.string.isRequired,
    hiddenButtonText: propTypes.string.isRequired,
}

TogglableBlog.displayName = 'TogglableBlog'

export default TogglableBlog