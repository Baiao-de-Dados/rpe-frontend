export interface Collaborator {
    id: number;
    nome: string;
    cargo: string;
    avatar?: string;
    image?: string; // Adicionado para compatibilidade com componentes
}

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
        nome: 'Paulo Rosado',
        cargo: 'Product Designer',
    },
    {
        id: 2,
        nome: 'Lorenzo Renzo',
        cargo: 'Frontend Developer',
    },
    {
        id: 3,
        nome: 'Luan Kato',
        cargo: 'Backend Developer',
    },
    {
        id: 4,
        nome: 'Ícaro Melo',
        cargo: 'UI/UX Designer',
    },
    {
        id: 5,
        nome: 'Ícaro Paes',
        cargo: 'Product Manager',
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
            collaborator.nome.toLowerCase().includes(lowerQuery) ||
            collaborator.cargo.toLowerCase().includes(lowerQuery),
    );
};
