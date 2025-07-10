export const managerEvaluationSections = [
    'Autoavaliação',
    'Avaliações 360° Recebidas',
    'Referências Recebidas',
    'Histórico',
] as const;

export type ManagerSectionType = (typeof managerEvaluationSections)[number];
