export const leaderEvaluationSections = [
    'Avaliação Geral',
] as const;

export type LeaderSectionType = (typeof leaderEvaluationSections)[number];
