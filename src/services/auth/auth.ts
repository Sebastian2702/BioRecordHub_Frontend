import api from '../../utils/axios.ts';
import { AUTH_ROUTES, COOKIE_ROUTE } from "../../routes/apiRoutes.ts";

export const register = async (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}) => {
    await api.get(COOKIE_ROUTE.csrf);
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

export const resetPassword = async (data:any) => {
    await api.get(COOKIE_ROUTE.csrf);
    const response = await api.post(AUTH_ROUTES.resetPassword, data);
    return response.data;
}

export const resetEmail = async (data:any) => {
    await api.get(COOKIE_ROUTE.csrf);
    const response = await api.post(AUTH_ROUTES.resetEmail, data);
    return response.data;
}

export const forgotPassword = async (data:any) => {
    await api.get(COOKIE_ROUTE.csrf);
    const response = await api.post(AUTH_ROUTES.forgotPassword, data);
    return response.data;
}


export const resetPasswordToken = async (data:any) => {
    await api.get(COOKIE_ROUTE.csrf);
    const response = await api.post(AUTH_ROUTES.reset_password_token, data);
    return response.data;
}