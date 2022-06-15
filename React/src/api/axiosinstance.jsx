import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:7060/api/'
});

// instance.defaults.headers.common['Authorization-Token'] = 'AUTH TOKEN SOMETHING';

export default instance;