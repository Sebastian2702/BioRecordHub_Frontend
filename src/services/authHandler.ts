import {getUser, login, logout, register} from "./auth.ts";
import {ROUTES} from "../routes/frontendRoutes.ts";


export const handleLogin = async ({
    email,
    password,
    navigate,
    setError,
    }: {
    email: string;
    password: string;
    navigate: (url: string) => void;
    setError: (msg: string) => void;
}) => {
    try {
        await login({email, password});
        navigate(ROUTES.dashboard);
    } catch (err: any) {
        console.error("Login failed:", err);
        setError("Invalid email or password");
    }
};

export const handleRegister = async ({
     name,
     email,
     password,
     password_confirmation,
     navigate,
     setError,
 }: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    navigate: (url: string) => void;
    setError: (msg: string) => void;
}) => {
    try {
        await register({ name, email, password, password_confirmation });
        navigate(ROUTES.dashboard);
    } catch (err: any) {
        console.error("Register error:", err);
        setError("Registration failed");
    }
};

export const handleLogout = async (navigate: (url: string) => void) => {
    try {
        await logout();
        navigate(ROUTES.login);
    } catch (err) {
        console.error("Logout error:", err);
    }
};

export const handleGetUser = async () => {
    try {
        const user = await getUser();
        return user;
    } catch (err) {
        console.error("Fetch user error:", err);
        return null;
    }
};