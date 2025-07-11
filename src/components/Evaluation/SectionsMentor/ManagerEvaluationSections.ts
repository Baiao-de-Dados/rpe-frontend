export const managerEvaluationSections = [
    'Autoavaliação',
    'Avaliações 360°',
    'Líderes',
    'Mentoring',
    'Referências',
    'Histórico',
] as const;

export type ManagerSectionType = (typeof managerEvaluationSections)[number];
