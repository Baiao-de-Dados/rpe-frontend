import { cn } from '../lib/utils';

export const CHART_COLORS = {
    EXCELLENT: '#5CB85C',
    GOOD: '#09A6A6',
    AVERAGE: '#F0AD4E',
    BELOW: '#FF9800',
    BAD: '#E5E7EB'
};

export const getScoreColor = (score: number): string => {
    if (score >= 4.5) return CHART_COLORS.EXCELLENT;
    if (score >= 3.5) return CHART_COLORS.GOOD;
    if (score >= 2.5) return CHART_COLORS.AVERAGE;
    if (!score) return CHART_COLORS.BAD;
    return CHART_COLORS.BELOW;
};

export const getPercentageColor = (percentage: number): string => {
    if (percentage >= 90) return CHART_COLORS.EXCELLENT;
    if (percentage >= 70) return CHART_COLORS.GOOD;
    if (percentage >= 50) return CHART_COLORS.AVERAGE;
    return CHART_COLORS.BELOW;
};

export const getScoreBgClasses = (score: number): string => {
    const color = getScoreColor(score);
    return cn(`bg-[${color}] text-white`);
};

export const getScoreTextClasses = (score: number): string => {
    const color = getScoreColor(score);
    return cn(`text-[${color}]`);
};

export const getScoreBadgeClasses = (score: number): string => {
    if (score >= 4.5) return cn(`bg-[#edf7ef] text-[${CHART_COLORS.EXCELLENT}]`);
    if (score >= 3.5) return cn(`bg-[#e6f3f3] text-[${CHART_COLORS.GOOD}]`);
    if (score >= 2.5) return cn(`bg-[#fff8e1] text-[${CHART_COLORS.AVERAGE}]`);
    return cn(`bg-[#fff3e0] text-[${CHART_COLORS.BELOW}]`);
};

export const getPercentageBadgeClasses = (percentage: number): string => {
    if (percentage >= 90) return cn(`bg-[#edf7ef] text-[${CHART_COLORS.EXCELLENT}]`);
    if (percentage >= 70) return cn(`bg-[#e6f3f3] text-[${CHART_COLORS.GOOD}]`);
    if (percentage >= 50) return cn(`bg-[#fff8e1] text-[${CHART_COLORS.AVERAGE}]`);
    return cn(`bg-[#fff3e0] text-[${CHART_COLORS.BELOW}]`);
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

export const getScoreStyles = (score: number): { color: string } => {
    const color = getScoreColor(score);
    return { color };
};

export const getScoreBgStyles = (score: number): { backgroundColor: string; color: string } => {
    const backgroundColor = getScoreColor(score);
    return { backgroundColor, color: 'white' };
};

export const getScoreBadgeStyles = (score: number): { backgroundColor: string; color: string } => {
    if (score >= 4.5) return { backgroundColor: '#edf7ef', color: CHART_COLORS.EXCELLENT };
    if (score >= 3.5) return { backgroundColor: '#e6f3f3', color: CHART_COLORS.GOOD };
    if (score >= 2.5) return { backgroundColor: '#fff8e1', color: CHART_COLORS.AVERAGE };
    return { backgroundColor: '#fff3e0', color: CHART_COLORS.BELOW };

};
