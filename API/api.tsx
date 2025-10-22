import axios from 'axios';
const baseURL = 'http://localhost:3000';

const api = axios.create({
    baseURL: baseURL,
});

api.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response?.status === 401) {
            console.error("Não autorizado. Redirecionando para o login...");
        }

        return Promise.reject(error);
    }
);

export default api;