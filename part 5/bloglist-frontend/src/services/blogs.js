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

const like = async blog => {
    const id = blog.id;
    const config = {
        headers: { likeOnly: 1, Authorization: token }
    }
    const response = await axios.put(`${baseUrl}/${id}`, {likes: blog.likes + 1}, config);
    return response.data;
}

export default { getAll, createBlog, setToken, like }