import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginRegistration from './pages/LoginRegistration.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Bibliographies from "./pages/Bibliography/Bibliographies.tsx";
import { ROUTES } from './routes/frontendRoutes.ts';
import AppLayout from './layouts/AppLayout.tsx';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute.tsx';
import Bibliography from './pages/Bibliography/Bibliography.tsx';
import NewBibliography from './pages/Bibliography/NewBibliography.tsx';
import EditBibliography from './pages/Bibliography/EditBibliography.tsx';
import NewBibliographyFileUpload from "./pages/Bibliography/NewBibliographyFileUpload.tsx";
import Nomenclature from "./pages/Nomenclature/Nomenclature.tsx";
import NewNomenclature from "./pages/Nomenclature/NewNomenclature.tsx";
import EditNomenclature from "./pages/Nomenclature/EditNomenclature.tsx";
import NewNomenclatureFileUpload from "./pages/Nomenclature/NewNomenclatureFileUpload.tsx";
import Nomenclatures from "./pages/Nomenclature/Nomenclatures.tsx";
import NomenclatureSearch from "./pages/Nomenclature/NomenclatureSearch.tsx";
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
                        <Route path={ROUTES.nomenclature} element={<Nomenclatures />} />
                        <Route path={ROUTES.nomenclature_search} element={<NomenclatureSearch />} />
                        <Route path={ROUTES.nomenclatureId} element={<Nomenclature />}/>
                        <Route path={ROUTES.nomenclatureCreate} element={<NewNomenclature />}/>
                        <Route path={ROUTES.nomenclatureEdit} element={<EditNomenclature />}/>
                        <Route path={ROUTES.nomenclatureFileUpload} element={<NewNomenclatureFileUpload/>}/>
                        <Route path={ROUTES.bibliography} element={<Bibliographies />} />
                        <Route path={ROUTES.bibliographyId} element={<Bibliography />} />
                        <Route path={ROUTES.bibliographyCreate} element={<NewBibliography />} />
                        <Route path={ROUTES.bibliographyFileUpload} element={<NewBibliographyFileUpload />} />
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
                        <Route path={ROUTES.bibliographyEdit} element={<EditBibliography />} />
                        <Route path={ROUTES.nomenclatureEdit} element={<EditNomenclature />} />

                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
