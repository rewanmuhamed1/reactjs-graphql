export const toKebabCase = (str) => {
    if (typeof str !== 'string') {
        return '';
    }
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
};