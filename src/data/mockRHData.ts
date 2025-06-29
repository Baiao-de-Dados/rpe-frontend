// src/data/mockRHData.ts
export const mockRHMetrics = {
    totalCollaborators: 127,
    completedEvaluations: 89,
    pendingEvaluations: 38,
    completionPercentage: 70,
};

export const mockTrackData = [
    { track: 'Tech', completed: 45, total: 50 },
    { track: 'Negócios', completed: 25, total: 35 },
    { track: 'RH', completed: 8, total: 10 },
    { track: 'Financeiro', completed: 11, total: 15 },
];

export const mockRHCollaborators = [
    {
        id: 1,
        name: 'Colaborador 1',
        department: 'Product Design',
        status: 'Pendente' as const,
    },
    {
        id: 2,
        name: 'Colaborador 2',
        department: 'Product Design',
        status: 'Finalizado' as const,
    },
    {
        id: 3,
        name: 'Colaborador 3',
        department: 'Product Design',
        status: 'Pendente' as const,
    },
    {
        id: 4,
        name: 'Colaborador 4',
        department: 'Product Design',
        status: 'Pendente' as const,
    },
    {
        id: 5,
        name: 'Colaborador 5',
        department: 'Product Design',
        status: 'Pendente' as const,
    },
    {
        id: 6,
        name: 'Colaborador 6',
        department: 'Engineering',
        status: 'Finalizado' as const,
    },
    {
        id: 7,
        name: 'Colaborador 7',
        department: 'Marketing',
        status: 'Pendente' as const,
    },
    {
        id: 8,
        name: 'Colaborador 8',
        department: 'Sales',
        status: 'Finalizado' as const,
    },
];
