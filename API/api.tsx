import axios from 'axios';

const API_PORT = 3000;
const LOCAL_IP = 'localhost'; 

let baseURL = `http://${LOCAL_IP}:${API_PORT}`;

if (typeof window !== 'undefined' && window.location.hostname !== LOCAL_IP) {
    baseURL = `http://${window.location.hostname}:${API_PORT}`;
}

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