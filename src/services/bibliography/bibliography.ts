import api from '../../utils/axios.ts';
import {BIBLIROGRAPHY_ROUTES, COOKIE_ROUTE} from "../../routes/apiRoutes.ts";

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

export const CreateBibliography = async (data: any) => {
    await api.get(COOKIE_ROUTE.csrf);
    const response = await api.post(BIBLIROGRAPHY_ROUTES.bibliography, data);
    return response.data;
}