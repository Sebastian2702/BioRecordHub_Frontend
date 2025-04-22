import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginRegistration from './pages/LoginRegistration.tsx';
import Dashboard from './pages/Dashboard.tsx';
import { ROUTES } from './routes/frontendRoutes.ts';
import AppLayout from './layouts/AppLayout.tsx'; // The one you just created

function App() {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<Navigate to={ROUTES.login} />} />
                <Route path={ROUTES.login} element={<LoginRegistration isLogin={true} />} />
                <Route path={ROUTES.register} element={<LoginRegistration isLogin={false} />} />

                <Route element={<AppLayout />}>
                    <Route path={ROUTES.dashboard} element={<Dashboard />} />
                    <Route path={ROUTES.nomenclature} element={<Dashboard />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
