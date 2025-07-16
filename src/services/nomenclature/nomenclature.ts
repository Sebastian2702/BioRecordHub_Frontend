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

export const GetAutocompleteNomenclature = async () => {
    const response = await api.get(NOMENCLATURE_ROUTES.autocompleteNomenclature);
    return response.data;
}

export const SearchNomenclature = async (data: any, setError: (msg: string) => void, setLoading: (loading: boolean) => void) => {
    setLoading(true);
    await api.get(COOKIE_ROUTE.csrf);
    try{
        const response = await api.post(NOMENCLATURE_ROUTES.searchNomenclature, data);
        setLoading(false);
        return response.data;
    }
    catch (err: any) {
        setLoading(false);
        const msg = err?.response?.data?.message || "An unknown error occurred";
        const cutmsg = msg.includes('.') ? msg.substring(0, msg.lastIndexOf('.')).trim() : msg;
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

export const DeleteNomenclature = async (id: number) => {
    const response = await api.delete(NOMENCLATURE_ROUTES.nomenclatureById(id));
    return response.data;
}

export const DeleteBibliographyFromNomenclature = async (id: number, bibliographyId: number) => {
    const response = await api.delete(NOMENCLATURE_ROUTES.deleteBibliographyFromNomenclature(id, bibliographyId));
    return response.data;
}

export const FetchGbifTaxonomy = async (speciesName: string, setLoading: (loading: boolean) => void, setError: (msg: string) => void) => {
    setLoading(true)
    try {
        const response = await fetch(`https://api.gbif.org/v1/species/match?name=${encodeURIComponent(speciesName)}`);
        const data = await response.json();

        if (!data.usageKey) {
            setLoading(false);
            setError("Species not found in GBIF");
            return null;
        }

        setLoading(false);
        return {
            kingdom: data.kingdom,
            phylum: data.phylum,
            class: data.class,
            order: data.order,
            family: data.family,
            genus: data.genus,
            species: speciesName,
            status: data.status
        };
    } catch (error) {
        setLoading(false);
        setError("Error fetching taxonomy: " +  error);
        return null;
    }
};