const message = {text: null}



export const messageAction = (text, seconds) => {
    return dispatch => {
        dispatch({
            type: 'NEW_MESSAGE',
            text
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR'
            })
        }, seconds * 1000)
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