import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null


const setToken = newToken => {
    token = `bearer ${newToken}`
}

const setAuthHeader = () => {
    return {
        headers: { Authorization: token }
    }
}

const getAll = async () => {
    const resonse = await axios.get(baseUrl)
    return resonse.data
}
const getBlog = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const createBlog = async blog => {
    const config = setAuthHeader()
    const response = await axios.post(baseUrl, blog, config)
    return response.data
}

const like = async blog => {
    const id = blog.id
    const config = setAuthHeader()
    config.headers.likeOnly = 1
    const response = await axios.put(`${baseUrl}/${id}`, { likes: blog.likes + 1 }, config)
    return response.data
}

const deleteBlog = async blog => {
    const id = blog.id
    const config = setAuthHeader()
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

const createComment = async (content, blog) => {
    const id = blog.id
    const resonse = await axios.post(`${baseUrl}/${id}/comments`, { content })
    return resonse.data
}

export default { getAll, createBlog, setToken, like, deleteBlog, getBlog, createComment }