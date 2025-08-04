import api from '../../utils/axios.ts';
import {OCCURRENCE_ROUTES, COOKIE_ROUTE} from "../../routes/apiRoutes.ts";
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