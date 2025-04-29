import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from "../routes/frontendRoutes.ts";

const AdminRoute = () => {
    const { isAuthenticated, isAdmin, } = useAuth();


    return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to={ROUTES.login} />;
};

export default AdminRoute;
