export const managerEvaluationSections = [
    'Autoavaliação',
    'Avaliações 360° Recebidas',
    'Referências Recebidas',
] as const;

export type ManagerSectionType = (typeof managerEvaluationSections)[number];
