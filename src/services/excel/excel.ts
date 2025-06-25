import api from '../../utils/axios.ts';
import {COOKIE_ROUTE, EXCEL_ROUTES} from "../../routes/apiRoutes.ts";

export const ImportBibliographyExcel = async (
    file: File,
    setError: (msg: string) => void,
    setLoading: (loading: boolean) => void,
    setDisable: (loading: boolean) => void
): Promise<any[]> => {
    await api.get(COOKIE_ROUTE.csrf);
    const formData = new FormData();
    formData.append('excel_file', file);

    try {
        setLoading(true);
        const response = await api.post(EXCEL_ROUTES.bibliography, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.bibliographies;
    } catch (err: any) {
        console.log("Error importing Excel file:", err);
        setLoading(false);
        setDisable(false);
        const msg = err.response?.data?.message || 'An error occurred while importing the Excel file.';
        setError(msg);
        return [];
    }
};