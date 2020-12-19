import axios from 'axios'
const baseUrl = '/api/users'

const getAllUserData = async () => {
    const response = await axios.get(baseUrl)
    const userAndBlogCount = []
    response.data.map(user => {
        let { name, blogs, id } = user
        userAndBlogCount.push({ name, blogCount: blogs.length, id })
    })
    return userAndBlogCount
}

const getUserBlogs = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    const blogs = response.data.blogs
    return blogs
}

const getUsers = async () => {
    const response = await axios.get(`${baseUrl}`)
    return response.data
}


export default { getAllUserData, getUserBlogs, getUsers }