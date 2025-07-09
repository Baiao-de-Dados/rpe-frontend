const formatSize = (size: number): string => {
    if (size >= 1024 * 1024) return `${Math.round(size / (1024 * 1024))}mb`;
    if (size >= 1024) return `${Math.round(size / 1024)}kb`;
    return `${size}b`;
};

export default formatSize;
