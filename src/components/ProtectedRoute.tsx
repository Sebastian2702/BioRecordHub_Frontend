import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from "../routes/frontendRoutes.ts";

const ProtectedRoute = () => {
    const { isAuthenticated, } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to= {ROUTES.login} />;
};

export default ProtectedRoute;
