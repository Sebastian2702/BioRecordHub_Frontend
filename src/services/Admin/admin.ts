import api from '../../utils/axios.ts';
import {Admin_ROUTES, COOKIE_ROUTE} from "../../routes/apiRoutes.ts";

export const GetUsers = async () => {
    const response = await api.get(Admin_ROUTES.getUsers);
    return response.data;
}

export const DeleteUser = async (id: number) => {
    await api.get(COOKIE_ROUTE.csrf);
    const response = await api.delete(Admin_ROUTES.deleteUser(id));
    return response.data;
}

export const UpdateUserRole = async (id: number, data: any) => {
    await api.get(COOKIE_ROUTE.csrf);
    const response = await api.put(Admin_ROUTES.updateRole(id),data);
    return response.data;
}

export const GetOccurrenceFields = async () => {
    const response = await api.get(Admin_ROUTES.getOccurrenceFields);
    return response.data;
}

export const newOccurrenceField = async (data: any) => {
    await api.get(COOKIE_ROUTE.csrf);
    const response = await api.post(Admin_ROUTES.getOccurrenceFields, data);
    return response.data;
}

export const updateOccurrenceField = async (id: number, data: any) => {
    await api.get(COOKIE_ROUTE.csrf);
    const response = await api.put(Admin_ROUTES.getOccurrenceFieldById(id), data);
    return response.data;
}