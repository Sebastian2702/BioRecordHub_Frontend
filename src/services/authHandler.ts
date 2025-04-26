import { ROUTES } from "../routes/frontendRoutes.ts";

export const handleLogin = async ({
    email,
    password,
    navigate,
    setError,
    contextLogin,
}: {
    email: string;
    password: string;
    navigate: (url: string) => void;
    setError: (msg: string) => void;
    contextLogin: (data: { email: string; password: string }) => Promise<void>;
}) => {
    try {
        await contextLogin({ email, password });
        navigate(ROUTES.dashboard);
    } catch (err) {
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
    contextRegister,
}: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    navigate: (url: string) => void;
    setError: (msg: string) => void;
    contextRegister: (data: { name: string; email: string; password: string; password_confirmation: string }) => Promise<void>;
}) => {
    try {
        await contextRegister({ name, email, password, password_confirmation });
        navigate(ROUTES.dashboard);
    } catch (err: any) {
        console.error("Register error:", err);
        setError("Registration failed");
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
