import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginRegistration from './pages/LoginRegistration.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Bibliographies from "./pages/Bibliographies.tsx";
import { ROUTES } from './routes/frontendRoutes.ts';
import AppLayout from './layouts/AppLayout.tsx';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute.tsx';
import 'react-toastify/dist/ReactToastify.css';

function App() {

    return (
        <Router>
            <Routes>

                // Public routes
                <Route path="/" element={<Navigate to={ROUTES.login} />} />
                <Route path={ROUTES.login} element={<LoginRegistration isLogin={true} />} />
                <Route path={ROUTES.register} element={<LoginRegistration isLogin={false} />} />

                // Authenticated users
                <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                        <Route path={ROUTES.dashboard} element={<Dashboard />} />
                        <Route path={ROUTES.nomenclature} element={<Dashboard />} />
                        <Route path={ROUTES.bibliography} element={<Bibliographies />} />
                        <Route path={ROUTES.occurrences} element={<Dashboard />} />
                        <Route path={ROUTES.projects} element={<Dashboard />} />
                        <Route path={ROUTES.reports} element={<Dashboard />} />
                        <Route path={ROUTES.profile} element={<Dashboard />} />
                    </Route>
                </Route>

                // Admin only
                <Route element={<AdminRoute />}>
                    <Route element={<AppLayout />}>
                        <Route path={ROUTES.admin} element={<Dashboard />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
