import axios from 'axios'
const baseURL = '/api/users'

const getAllUserData = async () => {
    const response = await axios.get(baseURL)
    const userAndBlogCount = []
    response.data.map(user => {
        let { name, blogs } = user
        userAndBlogCount.push({ name, blogCount: blogs.length })
    })
    return userAndBlogCount
}

export default { getAllUserData }