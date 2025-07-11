export const columnWidths = {
    date: 160,
    user: 140,
    action: 180,
    details: 320,
    ip: 140,
};

export const cellStyles = {
    header: {
        color: 'white',
        fontWeight: 700,
        borderBottom: '2px solid var(--color-neutral-200)',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        background: 'var(--color-primary-500)',
        zIndex: 99
    },
    body: {
        color: 'var(--color-neutral-800)',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        zIndex: -1, 
    },
    action: {
        color: 'var(--color-primary-500)',
        fontWeight: 600,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
};
