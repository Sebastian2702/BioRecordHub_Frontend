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

export const normalizeEntryDates = (entries: any[]) =>{
    return entries.map(entry => {
        const updatedEntry = { ...entry };
        if (entry.date_added) {
            const added = dayjs(entry.date_added, ['DD/MM/YYYY HH:mm', dayjs.ISO_8601], true);
            if (added.isValid()) {
                updatedEntry.date_added = added.second(0).millisecond(0).format('YYYY-MM-DD HH:mm:ss');
            }
        }

        if (entry.date_modified) {
            const modified = dayjs(entry.date_modified, ['DD/MM/YYYY HH:mm', dayjs.ISO_8601], true);
            if (modified.isValid()) {
                updatedEntry.date_modified = modified.second(0).millisecond(0).format('YYYY-MM-DD HH:mm:ss');
            }
        }

        return updatedEntry;
    });
}

export const extractBibliographyIds = (bibliographies: { id: number }[]): string[] => {
    return bibliographies.map(b => b.id);
}