import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginRegistration from './pages/LoginRegistration.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Bibliographies from "./pages/Bibliography/Bibliographies.tsx";
import { ROUTES, ADMIN_ROUTES } from './routes/frontendRoutes.ts';
import AppLayout from './layouts/AppLayout.tsx';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute.tsx';
import ManagerRoute from './components/ManagerRoute';
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
import AdminControlPanel from "./pages/Admin/AdminControlPanel.tsx";
import Projects from "./pages/Projects/Projects.tsx";
import Project from "./pages/Projects/Project.tsx";
import 'react-toastify/dist/ReactToastify.css';
import NewProject from "./pages/Projects/NewProject.tsx";
import EditProject from "./pages/Projects/EditProject.tsx";
import Occurrences from "./pages/occurrences/Occurrences.tsx";
import NewOccurrence from "./pages/occurrences/NewOccurrence.tsx";

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
                        <Route path={ROUTES.nomenclatureFileUpload} element={<NewNomenclatureFileUpload/>}/>
                        <Route path={ROUTES.bibliography} element={<Bibliographies />} />
                        <Route path={ROUTES.bibliographyId} element={<Bibliography />} />
                        <Route path={ROUTES.bibliographyCreate} element={<NewBibliography />} />
                        <Route path={ROUTES.bibliographyFileUpload} element={<NewBibliographyFileUpload />} />
                        <Route path={ROUTES.occurrences} element={<Occurrences />} />
                        <Route path={ROUTES.occurrenceCreate} element={<NewOccurrence />} />
                        <Route path={ROUTES.projects} element={<Projects />} />
                        <Route path={ROUTES.projectsCreate} element={<NewProject/>}/>
                        <Route path={ROUTES.projectsId} element={<Project />} />
                    </Route>
                </Route>

                // Manager and Admin routes
                <Route element={<ManagerRoute />}>
                    <Route element={<AppLayout />}>
                        <Route path={ADMIN_ROUTES.bibliographyEdit} element={<EditBibliography />} />
                        <Route path={ADMIN_ROUTES.nomenclatureEdit} element={<EditNomenclature />} />
                        <Route path={ADMIN_ROUTES.projectsEdit} element={<EditProject />} />
                    </Route>
                </Route>

                // Admin only
                <Route element={<AdminRoute />}>
                    <Route element={<AppLayout />}>
                        <Route path={ADMIN_ROUTES.admin} element={<AdminControlPanel />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
