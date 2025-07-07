export const mentorEvaluationSections = [
    'Autoavaliação',
    'Avaliação Geral',
] as const;

export type MentorSectionType = (typeof mentorEvaluationSections)[number];
