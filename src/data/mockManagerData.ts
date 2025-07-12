// src/data/mockManagerData.ts

type BadgeVariant = 'default' | 'success' | 'warning';

export const mockManagerEvaluations: Record<
    number ,
    {
        autoavaliacao?: number;
        notaLider?: number;
        notaGestor?: number; // Nota que o gestor dá
        status: 'Finalizado' | 'Pendente';
        statusVariant: BadgeVariant;
    }
> = {
    1 : {
        autoavaliacao: 4.3,
        notaLider: 4.2,
        notaGestor: 4.4, // Gestor já avaliou
        status: 'Finalizado',
        statusVariant: 'success',
    },
    2 : {
        autoavaliacao: 3.9,
        notaLider: 3.8,
        // Sem notaGestor - ainda não avaliou
        status: 'Pendente',
        statusVariant: 'warning',
    },
    3 : {
        autoavaliacao: 4.5,
        notaLider: 4.3,
        notaGestor: 4.6, // Gestor já avaliou
        status: 'Finalizado',
        statusVariant: 'success',
    },
    4 : {
        autoavaliacao: 3.2,
        notaLider: 3.4,
        // Sem notaGestor - ainda não avaliou
        status: 'Pendente',
        statusVariant: 'warning',
    },
    5 : {
        autoavaliacao: 4.0,
        notaLider: 4.0,
        notaGestor: 4.1, // Gestor já avaliou
        status: 'Finalizado',
        statusVariant: 'success',
    },
};

interface ManagedCollaborator {
    id: number;
    name: string;
    position: string;
    selfEvaluation?: number;
    leaderEvaluation?: number; // Nota do líder
    managerEvaluation?: number; // Nota do gestor
    finalScore?: number;
    evaluationStatus: 'Não iniciado' | 'Em andamento' | 'Aguardando revisão' | 'Finalizado';
    avatar?: string;
}

export interface ManagerData {
    // Dados para ambos os status
    managedCollaborators: ManagedCollaborator[];
    totalLeaders: number;
    totalCollaborators: number;
    completionPercentage: number;
    
    // Para ciclo aberto
    collaboratorsNotFinished: number;
    
    // Para ciclo fechado
    leadersCompleted: number;
    collaboratorsNotCompleted: number;
    pendingReviews: number;
    
    // Dados gerais (mantidos para compatibilidade)
    pendingEvaluations: number;
    daysToDeadline: number;
    deadlineDate: string;
    cycleStatus: 'open' | 'closed';
}

export const mockManagerData: ManagerData = {
    // Colaboradores geridos
    managedCollaborators: [
        {
            id: 1,
            name: 'Ana Silva',
            position: 'Desenvolvedora Frontend',
            selfEvaluation: 4.2,
            leaderEvaluation: 4.1, // Nota do líder
            managerEvaluation: 4.0, // Gestor já avaliou
            finalScore: 4.1,
            evaluationStatus: 'Finalizado',
            avatar: undefined,
        },
        {
            id: 2,
            name: 'Carlos Oliveira',
            position: 'Desenvolvedor Backend',
            selfEvaluation: 3.8,
            leaderEvaluation: 3.9, // Nota do líder
            managerEvaluation: undefined, // Gestor ainda não avaliou
            finalScore: undefined,
            evaluationStatus: 'Aguardando revisão',
            avatar: undefined,
        },
        {
            id: 3,
            name: 'Maria Santos',
            position: 'UX Designer',
            selfEvaluation: 4.5,
            leaderEvaluation: 4.4, // Nota do líder
            managerEvaluation: 4.3, // Gestor já avaliou
            finalScore: 4.4,
            evaluationStatus: 'Finalizado',
            avatar: undefined,
        },
        {
            id: 4,
            name: 'João Pereira',
            position: 'Analista de Dados',
            selfEvaluation: 3.5,
            leaderEvaluation: 3.6, // Nota do líder
            managerEvaluation: undefined, // Gestor ainda não avaliou
            finalScore: undefined,
            evaluationStatus: 'Em andamento',
            avatar: undefined,
        },
        {
            id: 5,
            name: 'Fernanda Costa',
            position: 'Product Owner',
            selfEvaluation: 4.0,
            leaderEvaluation: 3.9, // Nota do líder
            managerEvaluation: undefined, // Gestor ainda não avaliou
            finalScore: undefined,
            evaluationStatus: 'Aguardando revisão',
            avatar: undefined,
        },
        {
            id: 6,
            name: 'Rafael Lima',
            position: 'DevOps Engineer',
            selfEvaluation: 3.2,
            leaderEvaluation: 3.3, // Nota do líder
            managerEvaluation: 3.4, // Gestor já avaliou
            finalScore: 3.3,
            evaluationStatus: 'Finalizado',
            avatar: undefined,
        },
    ],
    
    // Dados para ambos os status
    totalLeaders: 3, // Gestor tem 3 líderes sob sua gestão
    totalCollaborators: 6,
    completionPercentage: 83, // 5 de 6 colaboradores iniciaram suas avaliações
    
    // Para ciclo aberto
    collaboratorsNotFinished: 2, // 2 colaboradores ainda não finalizaram
    
    // Para ciclo fechado
    leadersCompleted: 2, // 2 de 3 líderes concluíram suas avaliações
    collaboratorsNotCompleted: 1, // 1 colaborador não finalizou
    pendingReviews: 3, // 3 revisões pendentes que o gestor precisa fazer
    
    // Dados gerais (mantidos para compatibilidade)
    pendingEvaluations: 3, // 3 colaboradores aguardando avaliação do gestor
    daysToDeadline: 15,
    deadlineDate: '15/09/2025',
    cycleStatus: 'open', // Pode ser 'open' ou 'closed'
};
