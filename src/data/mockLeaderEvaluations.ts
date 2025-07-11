export interface LeaderEvaluation {
    id: string;
    collaboratorId: string;
    leaderId: string;
    leaderName: string;
    leaderImage?: string;
    leaderAvatar?: string;
    cycleId?: string;
    cycleName: string;
    generalRating: number;
    generalJustification: string;
    strengths: string;
    improvements: string;
    submittedAt: string;
    isSubmitted: boolean;
}

export const mockLeaderEvaluations: LeaderEvaluation[] = [
    {
        id: 'leader-eval-1',
        collaboratorId: 'colab-001', // <- Corrigido para colab-001
        leaderId: 'leader-1',
        leaderName: 'Ana Silva',
        leaderImage: '/avatars/ana-silva.jpg',
        cycleId: 'cycle-2024-1',
        cycleName: '2024.1',
        generalRating: 4.2,
        generalJustification: 'Colaborador demonstra excelente capacidade técnica e boa comunicação com a equipe. Tem se destacado nas entregas e no cumprimento de prazos.',
        strengths: 'Forte conhecimento técnico, proatividade, boa comunicação interpessoal, capacidade de resolver problemas complexos.',
        improvements: 'Poderia trabalhar mais na documentação dos códigos e compartilhamento de conhecimento com junior developers.',
        submittedAt: '2024-02-15T14:30:00Z',
        isSubmitted: true,
    },
    {
        id: 'leader-eval-2',
        collaboratorId: 'colab-002', // <- Corrigido para colab-002
        leaderId: 'leader-1',
        leaderName: 'Ana Silva',
        leaderImage: '/avatars/ana-silva.jpg',
        cycleId: 'cycle-2024-1',
        cycleName: '2024.1',
        generalRating: 3.8,
        generalJustification: 'Colaborador tem boa performance técnica, mas precisa melhorar aspectos de liderança e comunicação.',
        strengths: 'Conhecimento técnico sólido, dedicação, pontualidade.',
        improvements: 'Desenvolver habilidades de liderança, melhorar comunicação em apresentações, ser mais assertivo em reuniões.',
        submittedAt: '2024-02-14T16:45:00Z',
        isSubmitted: true,
    },
    {
        id: 'leader-eval-3',
        collaboratorId: 'colab-003', // <- Corrigido para colab-003
        leaderId: 'leader-2',
        leaderName: 'Carlos Mendes',
        leaderImage: '/avatars/carlos-mendes.jpg',
        cycleId: 'cycle-2024-1',
        cycleName: '2024.1',
        generalRating: 4.5,
        generalJustification: 'Excelente colaborador, demonstra maturidade técnica e ótimas habilidades interpessoais.',
        strengths: 'Liderança natural, comunicação excelente, capacidade de mentoria, visão estratégica.',
        improvements: 'Continuar desenvolvendo conhecimentos em novas tecnologias, especialmente em cloud computing.',
        submittedAt: '2024-02-16T10:20:00Z',
        isSubmitted: true,
    },
    {
        id: 'leader-eval-4',
        collaboratorId: 'colab-004', // <- Corrigido para colab-004
        leaderId: 'leader-2',
        leaderName: 'Carlos Mendes',
        leaderImage: '/avatars/carlos-mendes.jpg',
        cycleId: 'cycle-2024-1',
        cycleName: '2024.1',
        generalRating: 3.5,
        generalJustification: 'Colaborador em desenvolvimento, mostra potencial mas precisa de mais experiência.',
        strengths: 'Boa vontade de aprender, flexibilidade, trabalho em equipe.',
        improvements: 'Desenvolver conhecimento técnico mais profundo, melhorar autonomia na resolução de problemas.',
        submittedAt: '2024-02-13T09:15:00Z',
        isSubmitted: true,
    },
];

export default mockLeaderEvaluations;
