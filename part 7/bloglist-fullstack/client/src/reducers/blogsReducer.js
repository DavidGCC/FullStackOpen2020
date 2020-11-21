import blogService from '../services/blogs'

export const initializeBlogsAction = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT',
            data: blogs
        })
    }
}

export const createBlogAction = blog => {
    return async dispatch => {
        const newBlog = await blogService.createBlog(blog)
        dispatch({
            type: 'CREATE',
            blog: newBlog
        })
    }
}

export const likeBlogAction = blog => {
    return async dispatch => {
        await blogService.like(blog)
        dispatch({
            type: 'LIKE',
            id: blog.id
        })
    }
}

export const deleteBlogAction = blog => {
    return async dispatch => {
        await blogService.deleteBlog(blog)
        dispatch({
            type: 'DELETE',
            id: blog.id
        })
    }
}

const blogReducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT':
        return action.data
    case 'CREATE':
        return [...state, action.blog]
    case 'DELETE':
        return state.filter(blog => blog.id !== action.id)
    case 'LIKE':
        return state.map(blog => {
            if (blog.id === action.id) {
                return { ...blog, likes: blog.likes + 1 }
            } else {
                return { ...blog }
            }
        })
    default:
        return state
    }
}

export default blogReducer