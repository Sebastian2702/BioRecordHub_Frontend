import api from '../../utils/axios.ts';
import {PROJECT_ROUTES, COOKIE_ROUTE} from "../../routes/apiRoutes.ts";
import {ROUTES} from "../../routes/frontendRoutes.ts";

export const GetProject = async () => {
    const response = await api.get(PROJECT_ROUTES.projects);
    return response.data;
}

export const GetProjectById = async (id: number) => {
    const response = await api.get(PROJECT_ROUTES.projectsById(id));
    return response.data;
}

export const CreateProject = async (data: any, setLoading: (loading: boolean) => void, setError: (msg: string) => void, navigate: (url: string) => void) => {
    await api.get(COOKIE_ROUTE.csrf);
    try {
        setLoading(true);
        await api.post(PROJECT_ROUTES.projects, data);
        setLoading(false);
        navigate(ROUTES.projects);
    } catch (err: any) {
        setLoading(false);
        const msg = err.response.data.message;
        const cutmsg = msg.substring(0, msg.lastIndexOf('.')).trim();
        setError(cutmsg);
    }
}

export const DeleteProject = async (id: number) => {
    await api.get(COOKIE_ROUTE.csrf);
    try {
        await api.delete(PROJECT_ROUTES.projectsById(id));
    } catch (err: any) {
        const msg = err.response.data.message;
        const cutmsg = msg.substring(0, msg.lastIndexOf('.')).trim();
        throw new Error(cutmsg);
    }
}