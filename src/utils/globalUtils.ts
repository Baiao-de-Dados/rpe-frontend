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
