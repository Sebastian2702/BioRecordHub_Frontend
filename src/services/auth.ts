import api from '../utils/axios';

export const register = async (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}) => {
    await api.get('/sanctum/csrf-cookie'); // 👈 Required
    const response = await api.post('/register', data);
    return response.data;
};

export const login = async (data: {
    email: string;
    password: string;
}) => {
    await api.get('/sanctum/csrf-cookie');
    const response = await api.post('/login', data);
    return response.data;
};

export const getUser = async () => {
    const response = await api.get('/api/user');
    return response.data;
};

export const logout = async () => {
    await api.post('/logout');
};