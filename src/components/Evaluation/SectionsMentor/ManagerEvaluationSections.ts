export const managerEvaluationSections = [
    'Avaliação',
    'Avaliações 360°',
    'Mentoring',
    'Referências',
    'Liderança',
    'Histórico',
] as const;

export type ManagerSectionType = (typeof managerEvaluationSections)[number];
