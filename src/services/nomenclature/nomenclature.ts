import api from '../../utils/axios.ts';
import {NOMENCLATURE_ROUTES, COOKIE_ROUTE} from "../../routes/apiRoutes.ts";
import {ROUTES} from "../../routes/frontendRoutes.ts";


export const GetNomenclature = async () => {
    const response = await api.get(NOMENCLATURE_ROUTES.nomenclature);
    return response.data;
}

export const GetNomenclatureById = async (id: number) => {
    const response = await api.get(NOMENCLATURE_ROUTES.nomenclatureById(id));
    return response.data;
}

export const CreateNomenclature = async (data: any, setLoading: (loading: boolean) => void, setError: (msg: string) => void, navigate: (url: string) => void,) => {
    await api.get(COOKIE_ROUTE.csrf);
    try{
       setLoading(true);
       await api.post(NOMENCLATURE_ROUTES.nomenclature, data);
       setLoading(false);
       navigate(ROUTES.nomenclature);
   }
    catch (err: any) {
        setLoading(false);
        const msg = err.response.data.message;
        const cutmsg = msg.substring(0, msg.lastIndexOf('.')).trim();
        setError(cutmsg);
    }
}

export const CreateNomenclatureFromExcel = async (data: any, setError: (msg: string) => void, setLoading: (loading: boolean) => void, navigate: (url: string) => void,) => {
    await api.get(COOKIE_ROUTE.csrf);
    console.log(data)
    try{
        setLoading(true);
        await api.post(NOMENCLATURE_ROUTES.nomenclatureFromExcel, data);
        setLoading(false);
        navigate(ROUTES.nomenclature);
    }
    catch (err: any) {
        setLoading(false);
        const msg = err.response.data.message;
        const cutmsg = msg.substring(0, msg.lastIndexOf('.')).trim();
        setError(cutmsg);
    }
}

export const EditNomenclatureRequest = async (id: number, data: any, setLoading: (loading: boolean) => void, setError: (msg: string) => void, navigate: (url: string) => void,) => {
    await api.get(COOKIE_ROUTE.csrf);
    try{
        setLoading(true);
        await api.put(NOMENCLATURE_ROUTES.nomenclatureById(id), data);
        setLoading(false);
        navigate(ROUTES.nomenclature);
    }
    catch (err: any) {
        setLoading(false);
        const msg = err.response.data.message;
        const cutmsg = msg.substring(0, msg.lastIndexOf('.')).trim();
        setError(cutmsg);
    }
}

export const DeleteBibliographyFromNomenclature = async (id: number, bibliographyId: number) => {
    const response = await api.delete(NOMENCLATURE_ROUTES.deleteBibliographyFromNomenclature(id, bibliographyId));
    return response.data;
}