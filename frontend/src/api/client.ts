import axios from 'axios';

const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// interceptor to add jwt token to each request 
client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// rm old/ bad/ stale tokens
client.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem('token');
        }
        return Promise.reject(err);
    }
);

export default client;