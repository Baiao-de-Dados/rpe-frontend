export interface MentoringEvaluation {
    id: string;
    mentorId: string;
    mentorName: string;
    menteeId: string;
    menteeName: string;
    menteeCargo?: string; // <- Novo campo para o cargo do mentee
    cycleId?: string;
    cycleName: string;
    rating: number;
    justification: string;
    submittedAt: string;
    isSubmitted: boolean;
}

export const mockMentoringEvaluations: MentoringEvaluation[] = [
    {
        id: 'mentoring-eval-1',
        mentorId: 'colab-001',
        mentorName: 'Colaborador 1',
        menteeId: 'colab-005',
        menteeName: 'Ana Silva',
        menteeCargo: 'Product Manager', // <- Novo campo
        cycleId: 'cycle-2024-1',
        cycleName: '2024.1',
        rating: 4.5,
        justification: 'Excelente mentor, sempre disponível para ajudar e compartilhar conhecimento. Suas orientações foram fundamentais para meu desenvolvimento.',
        submittedAt: '2024-02-15T14:30:00Z',
        isSubmitted: true,
    },
    {
        id: 'mentoring-eval-2',
        mentorId: 'colab-001',
        mentorName: 'Colaborador 1',
        menteeId: 'colab-006',
        menteeName: 'João Costa',
        menteeCargo: 'UX Designer', // <- Novo campo
        cycleId: 'cycle-2024-1',
        cycleName: '2024.1',
        rating: 4.8,
        justification: 'Mentor excepcional! Tem uma didática incrível e sempre me motivou a buscar soluções criativas. Aprendi muito com ele.',
        submittedAt: '2024-02-16T10:20:00Z',
        isSubmitted: true,
    },
    {
        id: 'mentoring-eval-3',
        mentorId: 'colab-003',
        mentorName: 'Colaborador 3',
        menteeId: 'colab-007',
        menteeName: 'Lucas Oliveira',
        menteeCargo: 'Frontend Developer', // <- Novo campo
        cycleId: 'cycle-2024-1',
        cycleName: '2024.1',
        rating: 4.2,
        justification: 'Ótimo mentor, me ajudou muito no desenvolvimento técnico e pessoal. Sempre paciente e disposto a explicar os conceitos.',
        submittedAt: '2024-02-14T16:45:00Z',
        isSubmitted: true,
    },
    {
        id: 'mentoring-eval-4',
        mentorId: 'colab-002',
        mentorName: 'Colaborador 2',
        menteeId: 'colab-008',
        menteeName: 'Fernanda Lima',
        menteeCargo: 'Data Analyst', // <- Novo campo
        cycleId: 'cycle-2024-1',
        cycleName: '2024.1',
        rating: 4.0,
        justification: 'Bom mentor, me orientou bem nas questões técnicas. Poderia ser mais proativo em acompanhar o progresso.',
        submittedAt: '2024-02-13T09:15:00Z',
        isSubmitted: true,
    },
];

export default mockMentoringEvaluations;
