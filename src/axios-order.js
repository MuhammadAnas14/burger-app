import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-d1d8b.firebaseio.com'
})

export default instance;

