import axios from 'axios'
const baseUrl = '/api/login'


const login = async (username, password) => await (await axios.post(baseUrl, { username, password })).data

export default { login }