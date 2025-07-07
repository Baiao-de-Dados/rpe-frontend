export const getDateOnly = (dateString: string): string => {
    if (dateString.includes('T')) {
        return dateString.split('T')[0];
    }
    if (dateString.includes(' ')) {
        return dateString.split(' ')[0];
    }
    return dateString;
};

export function formatDate(date: string | Date): string {
    let d: Date;
    if (typeof date === 'string') {
        const dateOnly = getDateOnly(date);
        const [year, month, day] = dateOnly.split('-').map(Number);
        d = new Date(year, month - 1, day);
    } else {
        d = date;
    }
    return d.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

export const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};
