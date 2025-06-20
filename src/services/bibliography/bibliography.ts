import api from '../../utils/axios.ts';
import {BIBLIROGRAPHY_ROUTES, COOKIE_ROUTE} from "../../routes/apiRoutes.ts";
import {ROUTES} from "../../routes/frontendRoutes.ts";

export const GetBibliography = async () => {
    const response = await api.get(BIBLIROGRAPHY_ROUTES.bibliography);
    return response.data;
}

export const GetBibliographyById = async (id: number) => {
    const response = await api.get(BIBLIROGRAPHY_ROUTES.bibliographyById(id));
    return response.data;
}

export const DeleteBibliography = async (id: number) => {
    const response = await api.delete(BIBLIROGRAPHY_ROUTES.bibliographyById(id));
    return response.data;
}

export const CreateBibliography = async (data: any,
                                         setError: (msg: string) => void,
                                         navigate: (url: string) => void,
                                         setLoading: (loading: boolean) => void,
) => {
    await api.get(COOKIE_ROUTE.csrf);
    try {
        setLoading(true);
        await api.post(BIBLIROGRAPHY_ROUTES.bibliography, data);
        setLoading(false)
        navigate(ROUTES.bibliography);
    } catch (err: any) {
        setLoading(false);
        const msg = err.response.data.message;
        const cutmsg = msg.substring(0, msg.lastIndexOf('.')).trim();
        setError(cutmsg);
    }
}