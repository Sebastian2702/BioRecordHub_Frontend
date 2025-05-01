import api from '../utils/axios';
import { AUTH_ROUTES, COOKIE_ROUTE } from "../routes/apiRoutes.ts";

export const register = async (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}) => {
    await api.get(COOKIE_ROUTE.csrf); // Required
    const response = await api.post(AUTH_ROUTES.register, data);
    return response.data;
};

export const login = async (data: {
    email: string;
    password: string;
}) => {
    await api.get(COOKIE_ROUTE.csrf);
    const response = await api.post(AUTH_ROUTES.login, data);
    return response.data;
};

export const getUser = async () => {
    const response = await api.get(AUTH_ROUTES.user);
    return response.data;
};

export const logout = async () => {
    await api.post(AUTH_ROUTES.logout);
};