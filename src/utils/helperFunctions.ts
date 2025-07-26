import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const capitalize = (str: string | undefined): string => {
    if (typeof str !== 'string') {
        throw new TypeError('Expected a string');
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncateString = (str: string, maxLength: number): string => {
    if (typeof str !== 'string') {
        str = String(str);
    }
    if (str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength) + '...';
}

export const formatLabel = (key?: string) =>
    typeof key === "string"
        ? key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
        : "";

export const unformatLabel = (label?: string) =>
    typeof label === "string"
        ? label.toLowerCase().replace(/ /g, "__")
        : "";

export const formatAuthors = (authors: string[]) => {
    return authors.join('; ');
}

export const formatContributors = (contributors: string, newContributer: string) => {
    if( contributors === "" ) {
        return newContributer;

    }
    else if (!contributors.includes(newContributer)) {
        return contributors + "; " + newContributer;
    }
    return contributors;
}

export const getAuthors = (data: Record<string, any>): string[] => {
    if (!data || !data.author) {
        return [];
    }

    if (Array.isArray(data.author)) {
        return data.author.map((author: string) => author.trim());
    }

    if (typeof data.author === 'string') {
        return data.author
            .split('; ')
            .map((author: string) => author.trim())
            .filter(Boolean);
    }

    return [];
};

export const getNonRequiredFields = (data: Record<string, any>, notRequiredFields: string[]) => {
    const requiredFields = [
        'key',
        'title',
        'author',
        'publication_year',
        'item_type',
        'publication_title',
        'pages',
    ];

    const result: Record<string, any> = {};

    notRequiredFields.forEach((field) => {
        if (!requiredFields.includes(field) && field in data) {
            result[field] = data[field];
        }
    });
    return result;
};

export const normalizeEntryDates = (entries: any[], userName: string) =>{
    return entries.map(entry => {
        const date = dayjs(new Date(), ['DD/MM/YYYY HH:mm', dayjs.ISO_8601], true);
        return {
            ...entry,
            key: null,
            date_added: date.second(0).millisecond(0).format('YYYY-MM-DD HH:mm:ss'),
            date_modified: date.second(0).millisecond(0).format('YYYY-MM-DD HH:mm:ss'),
            volume: entry.volume === null ? '' : String(entry.volume),
            issue: entry.issue === null ? '' : String(entry.issue),
            contributors: formatContributors("", userName),
        };

    });
}

export const appendFileToFormData = (data: Record<string, any>, file:any, verified?:boolean) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
        if (data[key] !== undefined && data[key] !== null) {
            formData.append(key, data[key]);
        }
    });
    if (file) {
        formData.append('file', file);
    }
    if(verified) {
        formData.append('verified', verified ? '1' : '0');
    }
    return formData;
}

export const extractBibliographyIds = (bibliographies: { id: number }[]): string[] => {
    return bibliographies.map(b => b.id);
}

export const checkFormattingTaxonomicFields = (data: Record<string, string>, setError: (msg: string) => void, setLoading: (loading: boolean) => void,): boolean => {
    const fieldsToCheck = [
        'kingdom',
        'phylum',
        'subphylum',
        'class',
        'order',
        'suborder',
        'infraorder',
        'superfamily',
        'family',
    ];

    const pattern = /^[A-Za-zÀ-ÿ\s\-]+ [A-Za-zÀ-ÿ.\-]+, \d{4}$/;

    for (const field of fieldsToCheck) {
        const value = data[field];
        if (value && !pattern.test(value.trim())) {
            setLoading(false);
            setError(`Invalid format in "${field}". Expected: "Name Author, Year"`);
            return false;
        }
    }

    return true;
}