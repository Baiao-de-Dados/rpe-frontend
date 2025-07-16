import { format, toZonedTime } from 'date-fns-tz';
import { isBefore, parseISO } from 'date-fns';
import { differenceInCalendarDays } from 'date-fns';
import { format as formatTz } from 'date-fns-tz';

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
    const date = new Date(dateString);
    const timeZone = 'America/Sao_Paulo';
    const zonedDate = toZonedTime(date, timeZone); 
    return formatTz(zonedDate, 'dd/MM/yyyy HH:mm', { timeZone });
};

export function getBadgeText(start: string, end?: string | null) {
    return `${formatDate(start)} - ${end ? formatDate(end) : 'hoje'}`;
}

export function getBrazilDateString() {
    return format(new Date(), 'yyyy-MM-dd', { timeZone: 'America/Sao_Paulo' });
}

export function getRemainingDays({ startDate, endDate }: { startDate?: string; endDate?: string }) {
    if (!startDate && !endDate) {
        return { daysToStart: -1, daysToEnd: -1 };
    }
    const today = parseISO(getBrazilDateString());
    let daysToStart = 0;
    let daysToEnd = 0;

    if (startDate) {
        const start = parseISO(getDateOnly(startDate));
        daysToStart = isBefore(today, start)
            ? differenceInCalendarDays(start, today)
            : 0;
    }

    if (endDate) {
        const end = parseISO(getDateOnly(endDate));
        daysToEnd = isBefore(today, end)
            ? differenceInCalendarDays(end, today)
            : 0;
    }

    return { daysToStart, daysToEnd };
}
