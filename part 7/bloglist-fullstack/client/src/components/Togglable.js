import React, { useState, useImperativeHandle } from 'react'
import propTypes from 'prop-types'


const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => setVisible(!visible)

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.defaultButtonText}</button>
            </div>
            <div style={showWhenVisible} className='togglableContent'>
                {props.children}
                <br />
                <button onClick={toggleVisibility}>{props.hiddenButtonText}</button>
            </div>
        </div>

    )
})


Togglable.propTypes = {
    defaultButtonText: propTypes.string.isRequired,
    hiddenButtonText: propTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable