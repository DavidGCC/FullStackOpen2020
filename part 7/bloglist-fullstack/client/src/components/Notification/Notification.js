import React from 'react'

import { useSelector } from 'react-redux'


const Notification = (  ) => {

    const { usage, message } = useSelector(state => state.notification)

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
        <div>
            { message && <h2 style={messageStyle}>{message}</h2> }
        </div>
    )
}

export default Notification