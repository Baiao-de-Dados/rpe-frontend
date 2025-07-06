export function formatDate(date: string | Date): string {
    let d: Date;
    if (typeof date === 'string') {
        const [year, month, day] = date.split('-').map(Number);
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
