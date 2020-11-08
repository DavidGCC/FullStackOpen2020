import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const message = useSelector(state => state.notification)
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
    }
    message.type === 'error' ? style.color =  'red' : style.color = 'green'
    return (
        message.text && (<div style={style}>
            { message.text }
        </div>)
    )
}

export default Notification