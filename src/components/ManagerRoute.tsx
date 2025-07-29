import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from "../routes/frontendRoutes.ts";

const ManagerRoute = () => {
    const { isAuthenticated, isManager, isAdmin } = useAuth();

    return isAuthenticated && (isManager || isAdmin) ? <Outlet /> : <Navigate to={ROUTES.dashboard} />;
};

export default ManagerRoute;