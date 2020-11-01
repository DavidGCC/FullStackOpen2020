import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;
const setToken = newToken => {
    token = `bearer ${newToken}`;
}


const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data;
}

const createBlog = async blog => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, blog, config);
    return response.data;
}


export default { getAll, createBlog, setToken }