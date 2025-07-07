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
