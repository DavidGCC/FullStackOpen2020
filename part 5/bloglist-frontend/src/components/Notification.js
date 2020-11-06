import React from 'react';
import propTypes from 'prop-types';

const Notification = ( { message } ) => {
    const messageStyle = {
        fontSize: '2rem',
        width: 'fit-content',
        padding: 20
    }
    if (message.error) {
        messageStyle.color = 'red';
        messageStyle.border = '3px solid red';
    } else {
        messageStyle.color = 'green';
        messageStyle.border = '3px solid green';
    }

    return (
        <h2 style={messageStyle}>{message.text}</h2>
    )
}

Notification.propTypes = {
    message: propTypes.object.isRequired
}

export default Notification;