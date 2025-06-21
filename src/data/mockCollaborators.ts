export interface Collaborator {
    id: string;
    nome: string;
    cargo: string;
    avatar?: string;
}

export interface CollaboratorEvaluation {
    collaboratorId: string;
    ratings: Record<string, number>;
    pontosFortes: string;
    pontosMelhoria: string;
    referencia?: string;
}

export const mockCollaborators: Collaborator[] = [
    {
        id: 'colab-001',
        nome: 'Colaborador 1',
        cargo: 'Product Designer',
    },
    {
        id: 'colab-002',
        nome: 'Colaborador 2',
        cargo: 'Frontend Developer',
    },
    {
        id: 'colab-003',
        nome: 'Colaborador 3',
        cargo: 'Backend Developer',
    },
    {
        id: 'colab-004',
        nome: 'Colaborador 4',
        cargo: 'UI/UX Designer',
    },
    {
        id: 'colab-005',
        nome: 'Colaborador 5',
        cargo: 'Product Manager',
    },
];

export const getCollaboratorById = (id: string): Collaborator | undefined => {
    return mockCollaborators.find(collaborator => collaborator.id === id);
};

export const searchCollaborators = (query: string): Collaborator[] => {
    if (!query.trim()) return mockCollaborators;

    const lowerQuery = query.toLowerCase();
    return mockCollaborators.filter(
        collaborator =>
            collaborator.nome.toLowerCase().includes(lowerQuery) ||
            collaborator.cargo.toLowerCase().includes(lowerQuery),
    );
};
