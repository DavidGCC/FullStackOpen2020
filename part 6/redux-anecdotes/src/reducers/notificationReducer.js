const message = {text: null}



export const messageAction = (messageType, text) => {
    return {
        type: 'NEW_MESSAGE',
        messageType,
        text
    }
}


export const clearAction = () => {
    return {
        type: 'CLEAR'
    }
}


const notificationReducer = (state = message, action) => {
    switch(action.type) {
        case 'NEW_MESSAGE':
            return {
                messageType: action.messageType,
                text: action.text
            }
        case 'CLEAR':
            return message
        default:
            return state
    }
}

export default notificationReducer