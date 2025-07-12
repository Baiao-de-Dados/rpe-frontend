export interface MentoringEvaluation {
    id: number;
    mentorId: number;
    mentorName: string;
    menteeId: number;
    menteeName: string;
    menteeCargo?: string; // <- Novo campo para o cargo do mentee
    cycleId?: number;
    cycleName: string;
    rating: number;
    justification: string;
    submittedAt: string;
    isSubmitted: boolean;
}

export const mockMentoringEvaluations: MentoringEvaluation[] = [
    {
        id: 1,
        mentorId: 1,
        mentorName: 'Colaborador 1',
        menteeId: 5,
        menteeName: 'Ana Silva',
        menteeCargo: 'Product Manager',
        cycleId: 1,
        cycleName: '2024.1',
        rating: 4.5,
        justification: 'Excelente mentor, sempre disponível para ajudar e compartilhar conhecimento. Suas orientações foram fundamentais para meu desenvolvimento.',
        submittedAt: '2024-02-15T14:30:00Z',
        isSubmitted: true,
    },
    {
        id: 2,
        mentorId: 1,
        mentorName: 'Colaborador 1',
        menteeId: 6,
        menteeName: 'João Costa',
        menteeCargo: 'UX Designer',
        cycleId: 1,
        cycleName: '2024.1',
        rating: 4.8,
        justification: 'Mentor excepcional! Tem uma didática incrível e sempre me motivou a buscar soluções criativas. Aprendi muito com ele.',
        submittedAt: '2024-02-16T10:20:00Z',
        isSubmitted: true,
    },
    {
        id: 3,
        mentorId: 3,
        mentorName: 'Colaborador 3',
        menteeId: 7,
        menteeName: 'Lucas Oliveira',
        menteeCargo: 'Frontend Developer',
        cycleId: 1,
        cycleName: '2024.1',
        rating: 4.2,
        justification: 'Ótimo mentor, me ajudou muito no desenvolvimento técnico e pessoal. Sempre paciente e disposto a explicar os conceitos.',
        submittedAt: '2024-02-14T16:45:00Z',
        isSubmitted: true,
    },
    {
        id: 4,
        mentorId: 2,
        mentorName: 'Colaborador 2',
        menteeId: 8,
        menteeName: 'Fernanda Lima',
        menteeCargo: 'Data Analyst',
        cycleId: 1,
        cycleName: '2024.1',
        rating: 4.0,
        justification: 'Bom mentor, me orientou bem nas questões técnicas. Poderia ser mais proativo em acompanhar o progresso.',
        submittedAt: '2024-02-13T09:15:00Z',
        isSubmitted: true,
    },
];

export default mockMentoringEvaluations;
