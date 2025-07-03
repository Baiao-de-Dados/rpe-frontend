import api from '.';
import type { LoginPayload } from '../../types/auth';

export const authEndpoints = {
    login: (payload: LoginPayload) => api.post('/auth/login', payload),
    me: () => api.get('/auth/me'),
    createUser: (userData: unknown) => api.post('/auth/create-user', userData),
    logout: () => api.post('/auth/logout'),
};
