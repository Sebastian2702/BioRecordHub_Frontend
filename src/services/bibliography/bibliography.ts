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

export const DeleteNomenclatureFromBibliography = async (id: number, nomenclatureId: number) => {
    const response = await api.delete(BIBLIROGRAPHY_ROUTES.deleteNomenclatureFromBibliography(id, nomenclatureId));
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

export const CreateBibliographyFromExcel = async (data: any,
                                                  setError: (msg: string) => void,
                                                  navigate: (url: string) => void,
                                                  setLoading: (loading: boolean) => void,
) => {
    await api.get(COOKIE_ROUTE.csrf);
    try {
        setLoading(true);
        await api.post(BIBLIROGRAPHY_ROUTES.bibliographyFromExcel, {
            bibliographies: data,
        });
        setLoading(false)
        navigate(ROUTES.bibliography);
    } catch (err: any) {
        setLoading(false);
        const msg = err.response.data.message;
        const cutmsg = msg.substring(0, msg.lastIndexOf('.')).trim();
        console.log(cutmsg)
        setError(cutmsg);
    }
}

export const UpdateBibliography = async (data: any,
                                         setError: (msg: string) => void,
                                         setLoading: (loading: boolean) => void,
                                         navigate: (url: string) => void,
) => {
    await api.get(COOKIE_ROUTE.csrf);
    try {
        setLoading(true);
        await api.put(BIBLIROGRAPHY_ROUTES.bibliographyById(data.id), data);
        setLoading(false)
        navigate(ROUTES.bibliography + '/' + data.id);
    } catch (err: any) {
        setLoading(false);
        const msg = err.response.data.message;
        const cutmsg = msg.substring(0, msg.lastIndexOf('.')).trim();
        setError(cutmsg);
    }
}