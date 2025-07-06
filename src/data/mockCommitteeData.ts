// src/data/mockCommitteeData.ts
interface Collaborator {
    id: number;
    name: string;
    department: string;
    status: 'Pendente' | 'Finalizado';
}

export interface CommitteeData {
    daysToDeadline: number;
    deadlineDate: string;
    completionPercentage: number;
    pendingEqualizations: number;
    collaborators: Collaborator[];
}

export const mockCommitteeData: CommitteeData = {
    daysToDeadline: 30,
    deadlineDate: '30/08/2025',
    completionPercentage: 60,
    pendingEqualizations: 10,
    collaborators: [
        {
            id: 1,
            name: 'Colaborador 1',
            department: 'Product Design',
            status: 'Pendente',
        },
        {
            id: 2,
            name: 'Colaborador 2',
            department: 'Product Design',
            status: 'Pendente',
        },
        {
            id: 3,
            name: 'Colaborador 3',
            department: 'Product Design',
            status: 'Finalizado',
        },
        {
            id: 4,
            name: 'Colaborador 4',
            department: 'Product Design',
            status: 'Finalizado',
        },
        {
            id: 5,
            name: 'Colaborador 5',
            department: 'Product Design',
            status: 'Finalizado',
        },
        {
            id: 6,
            name: 'Ana Silva',
            department: 'Engineering',
            status: 'Pendente',
        },
        {
            id: 7,
            name: 'Carlos Santos',
            department: 'Marketing',
            status: 'Finalizado',
        },
        {
            id: 8,
            name: 'Mariana Costa',
            department: 'Engineering',
            status: 'Pendente',
        },
        {
            id: 9,
            name: 'Pedro Oliveira',
            department: 'Design',
            status: 'Finalizado',
        },
        {
            id: 10,
            name: 'Juliana Ferreira',
            department: 'Marketing',
            status: 'Pendente',
        },
        {
            id: 11,
            name: 'Roberto Lima',
            department: 'Engineering',
            status: 'Finalizado',
        },
        {
            id: 12,
            name: 'Fernanda Alves',
            department: 'Product Design',
            status: 'Pendente',
        },
    ],
};