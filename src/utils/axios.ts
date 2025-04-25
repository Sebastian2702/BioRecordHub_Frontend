// utils/axios.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
});


api.interceptors.request.use(config => {
    const token = decodeURIComponent(
        document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
    );

    if (token) {
        config.headers['X-XSRF-TOKEN'] = token;
    }


    return config;
});

export default api;
