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

export const getLastPathSegment = (): string => {
    const url = window.location.pathname;
    const segments = url.split('/').filter(Boolean);
    return segments[segments.length - 1] || '';
};