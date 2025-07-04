export const CHART_COLORS = {
    EXCELLENT: '#5CB85C',
    GOOD: '#09A6A6',
    AVERAGE: '#F0AD4E',
    BELOW: '#FF9800',
    POOR: '#D9534F',
};

export const getScoreColor = (score: number): string => {
    if (score >= 4.5) return CHART_COLORS.EXCELLENT;
    if (score >= 3.5) return CHART_COLORS.GOOD;
    if (score >= 2.5) return CHART_COLORS.AVERAGE;
    if (score >= 1.5) return CHART_COLORS.BELOW;
    return CHART_COLORS.POOR;
};

export const getPercentageColor = (percentage: number): string => {
    if (percentage >= 90) return CHART_COLORS.EXCELLENT;
    if (percentage >= 70) return CHART_COLORS.GOOD;
    if (percentage >= 50) return CHART_COLORS.AVERAGE;
    if (percentage >= 30) return CHART_COLORS.BELOW;
    return CHART_COLORS.POOR;
};

export const getScoreBgClasses = (score: number): string => {
    const color = getScoreColor(score);
    return `bg-[${color}] text-white`;
};

export const getScoreTextClasses = (score: number): string => {
    const color = getScoreColor(score);
    return `text-[${color}]`;
};

export const getScoreBadgeClasses = (score: number): string => {
    if (score >= 4.5) return `bg-[#edf7ef] text-[${CHART_COLORS.EXCELLENT}]`;
    if (score >= 3.5) return `bg-[#e6f3f3] text-[${CHART_COLORS.GOOD}]`;
    if (score >= 2.5) return `bg-[#fff8e1] text-[${CHART_COLORS.AVERAGE}]`;
    if (score >= 1.5) return `bg-[#fff3e0] text-[${CHART_COLORS.BELOW}]`;
    return `bg-[#fdf1f1] text-[${CHART_COLORS.POOR}]`;
};

export const getPercentageBadgeClasses = (percentage: number): string => {
    if (percentage >= 90) return `bg-[#edf7ef] text-[${CHART_COLORS.EXCELLENT}]`;
    if (percentage >= 70) return `bg-[#e6f3f3] text-[${CHART_COLORS.GOOD}]`;
    if (percentage >= 50) return `bg-[#fff8e1] text-[${CHART_COLORS.AVERAGE}]`;
    if (percentage >= 30) return `bg-[#fff3e0] text-[${CHART_COLORS.BELOW}]`;
    return `bg-[#fdf1f1] text-[${CHART_COLORS.POOR}]`;
};

export const getScoreColorHex = getScoreColor;
export const getScoreTextColor = getScoreTextClasses;

export const getScoreLabel = (score: number): string => {
    if (score >= 4.5) return 'Excelente';
    if (score >= 3.5) return 'Bom';
    if (score >= 2.5) return 'Regular';
    if (score >= 1.5) return 'Baixo';
    return 'Crítico';
};
