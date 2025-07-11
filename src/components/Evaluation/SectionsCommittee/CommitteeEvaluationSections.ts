export const committeeEvaluationSections = [
    'autoavaliacao',
    'avaliacao360',
    'mentoring',
    'lideres',
    'historico',
    'equalizacao',
] as const;

export type CommitteeSectionType = (typeof committeeEvaluationSections)[number];
