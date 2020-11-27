import React from 'react'
import propTypes from 'prop-types'

const Notification = ( { usage, message } ) => {
    const messageStyle = {
        fontSize: '2rem',
        width: 'fit-content',
        padding: 20
    }
    if (usage === 'error') {
        messageStyle.color = 'red'
        messageStyle.border = '3px solid red'
    } else {
        messageStyle.color = 'green'
        messageStyle.border = '3px solid green'
    }

    return (
        <h2 style={messageStyle}>{message}</h2>
    )
}

Notification.propTypes = {
    message: propTypes.string.isRequired,
    usage: propTypes.string.isRequired
}

export default Notification