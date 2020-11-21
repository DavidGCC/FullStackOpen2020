let timerID

export const setMessage = (usage, message) => {
    return dispatch => {
        dispatch({
            type: usage,
            message
        })
        clearTimeout(timerID)
        timerID = setTimeout(dispatch({
            type: 'CLEAR'
        }), 5000)
    }
}

const notificationReducer = (state = null, action) => {
    switch (action.type) {
    case 'ERROR':
        return {
            error: true,
            text: action.message
        }
    case 'SUCCESS':
        return {
            success: true,
            text: action.message
        }
    case 'CLEAR':
        return null
    default:
        return state
    }
}
export default notificationReducer