export const managerEvaluationSections = [
    'Autoavaliação',
    'Avaliações 360°',
    'Referências',
    'Histórico',
] as const;

export type ManagerSectionType = (typeof managerEvaluationSections)[number];
