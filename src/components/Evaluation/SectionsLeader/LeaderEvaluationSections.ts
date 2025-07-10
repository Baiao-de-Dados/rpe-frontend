export const leaderEvaluationSections = [
    'Avaliação Geral',
    'Histórico',
] as const;

export type LeaderSectionType = (typeof leaderEvaluationSections)[number];
