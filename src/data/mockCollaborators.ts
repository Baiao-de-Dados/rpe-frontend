import type { Collaborator, CollaboratorsEvaluationsSummary } from "../types/collaborator";

export interface CollaboratorEvaluation {
    collaboratorId: number;
    ratings: Record<string, number>;
    pontosFortes: string;
    pontosMelhoria: string;
    referencia?: string;
}

export const mockCollaborators: Collaborator[] = [
    {
        id: 1,
        name: 'Paulo Rosado',
        position: 'Product Designer',
        email: 'paulo.rosado@rocketlab.com',
        track: { id: 1, name: 'Design' },
    },
    {
        id: 2,
        name: 'Lorenzo Renzo',
        position: 'Frontend Developer',
        email: 'lorenzo.renzo@rocketlab.com',
        track: { id: 2, name: 'Frontend' },
    },
    {
        id: 3,
        name: 'Luan Kato',
        position: 'Backend Developer',
        email: 'luan.kato@rocketlab.com',
        track: { id: 3, name: 'Backend' },
    },
    {
        id: 4,
        name: 'Ícaro Melo',
        position: 'UI/UX Designer',
        email: 'icaro.melo@rocketlab.com',
        track: { id: 1, name: 'Design' },
    },
    {
        id: 5,
        name: 'Ícaro Paes',
        position: 'Product Manager',
        email: 'icaro.paes@rocketlab.com',
        track: { id: 4, name: 'Gestão' },
    },
];

export const mockCollaboratorsSummary: CollaboratorsEvaluationsSummary = [
    {
        collaborator: {
            id: 1,
            name: 'Paulo Rosado',
            position: 'Product Designer',
            email: 'paulo.rosado@rocketlab.com',
            track: { id: 1, name: 'Design' },
        },
        autoEvaluationScore: 2,
        evaluation360Score: 3,
        managerEvaluationScore: 4,
        finalEvaluationScore: 5,
        status: 'finalizado',
    },
    {
        collaborator: {
            id: 2,
            name: 'Lorenzo Renzo',
            position: 'Frontend Developer',
            email: 'lorenzo.renzo@rocketlab.com',
            track: { id: 2, name: 'Frontend' },
        },
        autoEvaluationScore: 3,
        evaluation360Score: 2,
        managerEvaluationScore: null,
        finalEvaluationScore: null,
        status: 'pendente',
    },
    {
        collaborator: {
            id: 3,
            name: 'Luan Kato',
            position: 'Backend Developer',
            email: 'luan.kato@rocketlab.com',
            track: { id: 3, name: 'Backend' },
        },
        autoEvaluationScore: 5,
        evaluation360Score: 3,
        managerEvaluationScore: 3,
        finalEvaluationScore: 4,
        status: 'finalizado',
    },
    {
        collaborator: {
            id: 4,
            name: 'Ícaro Melo',
            position: 'UI/UX Designer',
            email: 'icaro.melo@rocketlab.com',
            track: { id: 1, name: 'Design' },
        },
        autoEvaluationScore: null,
        evaluation360Score: null,
        managerEvaluationScore: null,
        finalEvaluationScore: null,
        status: 'pendente',
    },
    {
        collaborator: {
            id: 5,
            name: 'Ícaro Paes',
            position: 'Product Manager',
            email: 'icaro.paes@rocketlab.com',
            track: { id: 4, name: 'Gestão' },
        },
        autoEvaluationScore: 2,
        evaluation360Score: 4,
        managerEvaluationScore: 2,
        finalEvaluationScore: 3,
        status: 'finalizado',
    },
];

export const getCollaboratorById = (id: number): Collaborator | undefined => {
    return mockCollaborators.find(collaborator => collaborator.id === id);
};

export const searchCollaborators = (query: string): Collaborator[] => {
    if (!query.trim()) return mockCollaborators;

    const lowerQuery = query.toLowerCase();
    return mockCollaborators.filter(
        collaborator =>
            collaborator.name.toLowerCase().includes(lowerQuery) ||
            collaborator.position.toLowerCase().includes(lowerQuery),
    );
};
