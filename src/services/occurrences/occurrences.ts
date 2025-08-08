import api from '../../utils/axios.ts';
import {OCCURRENCE_ROUTES, COOKIE_ROUTE, NOMENCLATURE_ROUTES} from "../../routes/apiRoutes.ts";
import {ROUTES} from "../../routes/frontendRoutes.ts";

export const GetOccurrences = async () => {
    const response = await api.get(OCCURRENCE_ROUTES.occurrences);
    return response.data;
}

export const GetOccurrencesById = async (id: number) => {
    const response = await api.get(OCCURRENCE_ROUTES.occurrencesById(id));
    return response.data;
}

export const DeleteOccurrence = async (occurrenceId: number) => {
    await api.get(COOKIE_ROUTE.csrf);
    try {
        await api.delete(OCCURRENCE_ROUTES.occurrencesById(occurrenceId));
    } catch (err: any) {
        const msg = err.response.data.message;
        const cutmsg = msg.substring(0, msg.lastIndexOf('.')).trim();
        throw new Error(cutmsg);
    }
}

export const CreateOccurrence = async (data: any, setLoading: (loading: boolean) => void, setError: (msg: string) => void, navigate: (url: string) => void) => {
    await api.get(COOKIE_ROUTE.csrf);
    try{
        setLoading(true);
        await api.post(OCCURRENCE_ROUTES.occurrences, data);
        setLoading(false);
        navigate(ROUTES.occurrences);
    }
    catch (err: any) {
        setLoading(false);
        const msg = err.response.data.message;
        const cutmsg = msg.substring(0, msg.lastIndexOf('.')).trim();
        setError(cutmsg);
    }
}

export const EditOccurrenceRequest = async (id: number, data: any, setLoading: (loading: boolean) => void, setError: (msg: string) => void, navigate: (url: string) => void) => {
    await api.get(COOKIE_ROUTE.csrf);
    try {
        setLoading(true);
        await api.post(OCCURRENCE_ROUTES.occurrencesById(id), data);
        setLoading(false);
        navigate(ROUTES.occurrences + '/' + id);
    } catch (err: any) {
        setLoading(false);
        const msg = err.response.data.message;
        const cutmsg = msg.substring(0, msg.lastIndexOf('.')).trim();
        setError(cutmsg);
    }
}

export const DeleteOccurrenceFile = async (occurrenceId: number, fileId: number) => {
    await api.get(COOKIE_ROUTE.csrf);
    try {
        await api.delete(OCCURRENCE_ROUTES.occurrenceFile(occurrenceId, fileId));
    } catch (err: any) {
        const msg = err.response.data.message;
        const cutmsg = msg.substring(0, msg.lastIndexOf('.')).trim();
        throw new Error(cutmsg);
    }
}