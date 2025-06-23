// src/services/api.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';
const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 3000, // Reduzido para 3 segundos
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('@rpe:token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(
            '[AXIOS][REQUEST] Enviando token:',
            token.substring(0, 20) + '...',
        );
    } else {
        console.log('[AXIOS][REQUEST] Nenhum token encontrado no localStorage');
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            console.error(
                '[AXIOS][RESPONSE] Erro 401 Unauthorized. URL:',
                error.config.url,
            );
            // Remover token inválido
            localStorage.removeItem('@rpe:token');
            localStorage.removeItem('@rpe:user');

            // Redirecionar para login se não estiver já na página de login
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    },
);

export const authEndpoints = {
    login: (email: string, password: string) =>
        api.post('/auth/login', { email, password }),
    me: () => api.get('/auth/me'),
    createUser: (userData: unknown) => api.post('/auth/create-user', userData),
    logout: () => api.post('/auth/logout'),
};

export default api;
