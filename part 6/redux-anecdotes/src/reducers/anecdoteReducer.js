import anecdoteService from '../services/anecdoteService'
// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//     return {
//         content: anecdote,
//         id: getId(),
//         votes: 0
//     }
// }

export const voteAction = (id) => {
    return {
        type: 'VOTE',
        id
    }
}

export const createAction = (value) => {
    return {
        type: 'CREATE',
        anecdote: value
    }
}

export const initializeData = ( data ) => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INITIALIZE',
            data: anecdotes
        })
    }
}

const anecdoteReducer = (state = [], action) => {
    switch(action.type) {
        case 'VOTE':
            const id = action.id
            const newState = state.map(item => {
                if (item.id === id) {
                    return {...item, votes: item.votes + 1}
                } else {
                    return {...item}
                }
            })
            return newState
        case 'CREATE':
            return [...state, action.anecdote]
        case 'INITIALIZE':
            return action.data
        default:
            return state
    }
}

export default anecdoteReducer