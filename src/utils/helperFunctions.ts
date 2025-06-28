export const capitalize = (str: string | undefined): string => {
    if (typeof str !== 'string') {
        throw new TypeError('Expected a string');
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncateString = (str: string, maxLength: number): string => {
    if (typeof str !== 'string') {
        throw new TypeError('Expected a string');
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