export function getAllCyclesWithCurrent(localCurrentCycle: CurrentCycle, cycles: CurrentCycle[], currentCycleName: string) {
    const shouldAddCurrentCycle = localCurrentCycle && localCurrentCycle.name === currentCycleName && (!localCurrentCycle.startDate || !localCurrentCycle.endDate);
    return shouldAddCurrentCycle && !cycles.some(c => c.name === currentCycleName)
        ? [localCurrentCycle, ...cycles]
        : cycles;
}
import type { CurrentCycle } from "../types/cycle";

export type CycleStatus = 'open' | 'closed' | 'done' | 'upcoming' | 'undefined';

export function getCurrentCycleLocal(currentCycle: CurrentCycle, currentCycleName: string) {
    const shouldAddCurrentCycle = currentCycle && currentCycle.name !== currentCycleName;
    if (shouldAddCurrentCycle) {
        return { name: currentCycleName, isActive: false, done: false };
    }
    return currentCycle;
}

export function getCycleStatus({ isActive, done, daysToStart, daysToEnd }: {
    isActive: boolean;
    done: boolean;
    daysToStart?: number;
    daysToEnd?: number;
}): CycleStatus {
    if (typeof daysToStart !== 'number' || typeof daysToEnd !== 'number') {
        return 'undefined';
    }
    if (isActive && !done && daysToEnd > 0) {
        return 'open';
    }
    if (!isActive && !done && daysToEnd === 0 && daysToStart === 0) {
        return 'closed';
    }
    if (!isActive && done && daysToEnd === 0) {
        return 'done';
    }
    if (!isActive && !done && daysToStart > 0) {
        return 'upcoming';
    }
    return 'undefined';
}

export const getCurrentCycleName = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; 
    const semester = month <= 6 ? 1 : 2;
    return `${year}.${semester}`;
};

export function parseCycleString(cycleString: string): {
    year: number;
    semester: 1 | 2;
} {
    const match = cycleString.match(/(\d{4})\.(\d)/);
    return {
        year: match ? parseInt(match[1], 10) : new Date().getFullYear(),
        semester: match ? (parseInt(match[2], 10) as 1 | 2) : 1,
    };
}

export function getSemesterEndDate(year: number, semester: 1 | 2) {
    return semester === 1 ? `${year}-06-30` : `${year}-12-31`;
}

export function getSemesterStartDate(year: number, semester: 1 | 2) {
    return semester === 1 ? `${year}-01-01` : `${year}-07-01`;
}

export function isDateWithinSemester(date: string, year: number, semester: 1 | 2) {
    const min = getSemesterStartDate(year, semester);
    const max = getSemesterEndDate(year, semester);
    return date >= min && date <= max;
}
