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

export const formatLabel = (key: string) =>
    key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

export const formatAuthors = (authors: string[]) => {
    return authors.join(', ');
}