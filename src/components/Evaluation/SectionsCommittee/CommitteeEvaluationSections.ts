export const committeeEvaluationSections = [
    'Equalização',
    'Avaliação',
    'Avaliações 360',
    'Mentoring',
    'Histórico',
] as const;

export type CommitteeSectionType = (typeof committeeEvaluationSections)[number];
