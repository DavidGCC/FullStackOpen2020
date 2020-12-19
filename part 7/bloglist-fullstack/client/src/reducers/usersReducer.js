import usersService from '../services/users'
const initialState = []

export const getAllUsers = () => {
    return async dispatch => {
        const users = await usersService.getUsers()
        dispatch({
            type: 'INIT_USERS',
            users
        })
    }
}


const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'INIT_USERS':
            return action.users
        default:
            return state
    }
}

export default usersReducer