import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) return null;

    return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
