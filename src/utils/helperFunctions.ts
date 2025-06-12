export const capitalize = (str: string | undefined): string => {
    if (typeof str !== 'string') {
        throw new TypeError('Expected a string');
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
};