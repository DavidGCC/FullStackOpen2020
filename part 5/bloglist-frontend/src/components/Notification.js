import React from 'react';

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

export default Notification;