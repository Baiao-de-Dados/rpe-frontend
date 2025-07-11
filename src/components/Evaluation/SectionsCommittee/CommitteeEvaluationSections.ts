export const committeeEvaluationSections = [
    'Avaliação',
    'Avaliações 360',
    'Líderes',
    'Mentoring',
    'Histórico',
    'Equalização',
] as const;

export type CommitteeSectionType = (typeof committeeEvaluationSections)[number];
