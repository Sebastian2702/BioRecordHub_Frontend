import { createContext, useContext, useEffect, useState } from 'react';
import {
    login as apiLogin,
    register as apiRegister,
    logout as apiLogout,
    getUser,
} from '../services/auth/auth.ts';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (data: { email: string; password: string }) => Promise<void>;
    register: (data: {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    }) => Promise<void>;
    logout: () => Promise<void>;
    isAdmin: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const userData = await getUser(); // Should work with HTTP-only cookie
            setUser(userData);
        } catch {
            setUser(null);
        } finally {
            setLoading(false); // Always stop loading even on error
        }
    };

    useEffect(() => {
        fetchUser(); // Fetch on mount to restore session
    }, []);

    const login = async (data: { email: string; password: string }) => {
        await apiLogin(data);
        await fetchUser();
    };

    const register = async (data: {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    }) => {
        await apiRegister(data);
        await fetchUser();
    };

    const logout = async () => {
        await apiLogout();
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        loading,
        login,
        register,
        logout,
        isAdmin: user?.role === 'admin',
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {/* Only render children after loading is complete to prevent redirect glitch */}
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
