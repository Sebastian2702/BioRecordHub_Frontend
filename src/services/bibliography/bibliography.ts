import api from '../../utils/axios.ts';
import { BIBLIROGRAPHY_ROUTES } from "../../routes/apiRoutes.ts";

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