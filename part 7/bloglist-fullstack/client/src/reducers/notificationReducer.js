let timerID
const initialMessage = {
    usage: 'idle',
    message: null
}

export const createSuccessMessage = (message) => {
    return dispatch => {
        dispatch({
            type: 'SUCCESS',
            message
        })
        clearTimeout(timerID)
        timerID = setTimeout(() => dispatch({
            type: 'CLEAR'
        }), 5000)
    }
}

export const createErrorMessage = (message) => {
    return dispatch => {
        dispatch({
            type: 'ERROR',
            message
        })
        clearTimeout(timerID)
        timerID = setTimeout(() => dispatch({
            type: 'CLEAR'
        }), 5000)
    }
}

const notificationReducer = (state = initialMessage, action) => {
    switch (action.type) {
        case 'ERROR':
            return {
                usage: 'error',
                message: action.message
            }
        case 'SUCCESS':
            return {
                usage: 'success',
                message: action.message
            }
        case 'CLEAR':
            return {
                message: null
            }
        default:
            return state
    }
}
export default notificationReducer