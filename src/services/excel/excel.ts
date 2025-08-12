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
        const response = await api.post(EXCEL_ROUTES.bibliographyImport, formData, {
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

export const ImportNomenclatureExcel = async (
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
        const response = await api.post(EXCEL_ROUTES.nomenclatureImport, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.nomenclature;
    } catch (err: any) {
        console.log("Error importing Excel file:", err);
        setLoading(false);
        setDisable(false);
        const msg = err.response?.data?.message || 'An error occurred while importing the Excel file.';
        setError(msg);
        return [];
    }
};

export const ExportDataToExcel = async (ids: number[],
                                        dataType: 'nomenclature' | 'bibliography' | 'occurrence' | 'projects',
                                        setError: (msg: string) => void,
                                        setLoading: (loading: boolean) => void,) => {
    await api.get(COOKIE_ROUTE.csrf);
    setLoading(true)
    try {
        const response = await api.post(EXCEL_ROUTES.exportData(dataType), { ids }, {
            responseType: 'blob',
        });
        setLoading(false);

        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${dataType}_export.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (err: any) {
        setLoading(false);
        const msg = err.response?.data?.message || 'An error occurred while exporting data to Excel.';
        setError(msg);
        console.error("Error exporting data to Excel:", err);
    }
}
