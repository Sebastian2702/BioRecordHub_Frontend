import { ROUTES } from "../../routes/frontendRoutes.ts";
import api from "../../utils/axios.ts";
import {AUTH_ROUTES, COOKIE_ROUTE} from "../../routes/apiRoutes.ts";

export const handleLogin = async ({
    email,
    password,
    navigate,
    setError,
    contextLogin,
    setLoading,
    }: {
    email: string;
    password: string;
    navigate: (url: string) => void;
    setError: (msg: string) => void;
    contextLogin: (data: { email: string; password: string }) => Promise<void>;
    setLoading: (loading: boolean) => void;
    }) => {
    try {
        setLoading(true);
        await contextLogin({ email, password });
        setLoading(false);
        navigate(ROUTES.dashboard);
    } catch (err: any) {
        setLoading(false);
        const msg = "Invalid email or password";
        console.error("Login failed:", err);
        setError(msg);
    }
};

export const handleRegister = async ({
    name,
    email,
    password,
    password_confirmation,
    navigate,
    setError,
    contextRegister,
    setLoading,
}: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    navigate: (url: string) => void;
    setError: (msg: string) => void;
    contextRegister: (data: { name: string; email: string; password: string; password_confirmation: string }) => Promise<void>;
    setLoading: (loading: boolean) => void;
}) => {
    try {
        setLoading(true);
        await contextRegister({ name, email, password, password_confirmation });
        setLoading(false);
        navigate(ROUTES.dashboard);
    } catch (err: any) {
        setLoading(false);
        console.error("Register failed:", err.response.data.message);
        const msg = err.response.data.message;
        const cutmsg = msg.substring(0, msg.lastIndexOf('.')).trim();
        setError(cutmsg);
    }
};

export const handleLogout = async ({
    navigate,
    contextLogout,
   }: {
    navigate: (url: string) => void;
    contextLogout: () => Promise<void>;
}) => {
    try {
        await contextLogout();
        navigate(ROUTES.login);
    } catch (err) {
        console.error("Logout error:", err);
    }
};

export const handleFirstLogin = async () => {
    await api.get(COOKIE_ROUTE.csrf);
    const response = await api.post(AUTH_ROUTES.first_login);
    return response.data;
}
