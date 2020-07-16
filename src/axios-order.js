import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-burger-love.firebaseio.com/'
});

export default instance;