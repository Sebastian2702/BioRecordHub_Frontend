import api from '../../utils/axios.ts';
import {DASHBOARD_ROUTES} from "../../routes/apiRoutes.ts";

export const GetDashboardData = async () => {
    const response = await api.get(DASHBOARD_ROUTES.dashboard);
    return response.data;
}