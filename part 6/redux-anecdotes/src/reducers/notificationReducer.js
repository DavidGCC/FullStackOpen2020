const message = {text: null}


let timeoutID;
export const messageAction = (text, seconds) => {
    return dispatch => {
        clearTimeout(timeoutID)
        dispatch({
            type: 'NEW_MESSAGE',
            text
        })
        timeoutID = setTimeout(() => {
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