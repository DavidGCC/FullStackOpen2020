import axios from 'axios'
const baseURL = '/api/users'

const getAllUserData = async () => {
    const response = await axios.get(baseURL)
    const userAndBlogCount = {}
    response.data.map(user => {
        console.log(user)
        let { username, blogs } = user
        userAndBlogCount[username] = blogs.length
    })
    return userAndBlogCount
}

export default { getAllUserData }