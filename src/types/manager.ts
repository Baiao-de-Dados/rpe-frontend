import type { Leader } from "./leadership";

export interface AssignLeaderEvaluationPayload {
    collaboratorId: number;
    cycleId: number;
    leaderId: number | null;
}

export interface Project {
    projectId: number;
    projectName: string;
}

export interface ManagerCollaborator {
    id: number;
    name: string;
    position: string;
    project: Project;
    leaderId: number | null;
    leaderRating: number | null;
}

export interface LeadersAndCollaborators {
    leaders: Leader[];
    collaborators: ManagerCollaborator[];
}

// Dashboard types
export interface DashboardMetrics {
    totalLeaders: number;
    percentage: number;
    totalFilled: number;
    totalExpected: number;
    missing: number;
}

export interface CollaboratorEvaluationSummary {
    cycle: {
        id: number;
        name: string;
        startDate: string;
        endDate: string;
    } | null;
    collaborator: {
        id: number;
        name: string;
        position: string;
    };
    autoEvaluation: number | null;
    evaluation360: number | null;
    managerEvaluation: number | null;
    equalization: number | null;
}

export interface ManagerEvaluationPayload {
    cycleConfigId: number;
    managerId: number;
    colaboradorId: number;
    autoavaliacao: {
        pilares: {
            pilarId: number;
            criterios: {
                criterioId: number;
                nota: number;
                justificativa: string;
            }[];
        }[];
    };
}

export interface ManagerEvaluationResponse {
    autoavaliacao: {
        pilares: {
            pilarId: number;
            criterios: {
                criterioId: number;
                nota: number;
                justificativa: string;
            }[];
        }[];
    };
    average: number;
}

export interface AutoEvaluationAssignment {
    id: number;
    score: number;
    justification: string;
    criterion: {
        id: number;
        name: string;
    };
}

export interface AutoEvaluation {
    id: number;
    assignments: AutoEvaluationAssignment[];
}

export interface UserAutoEvaluation {
    id: number;
    evaluatorId: number;
    cycleConfigId: number;
    autoEvaluation: AutoEvaluation;
    cycleConfig: {
        id: number;
        name: string;
        startDate: string;
        endDate: string;
    };
}

// Collaborator evaluation types (baseadas nas rotas do employer)
export interface CriterioAvaliacao {
    criterioId: number;
    nota: number;
    justificativa: string;
}

export interface PilarAvaliacao {
    pilarId: number;
    criterios: CriterioAvaliacao[];
}

export interface AutoAvaliacao {
    pilares: PilarAvaliacao[];
}

export interface Avaliacao360 {
    avaliadoId: number;
    pontosFortes: string;
    pontosMelhoria: string;
    score: number;
}

export interface Mentoring {
    mentorId: number;
    justificativa: string;
    score: number;
}

export interface Referencia {
    colaboradorId: number;
    justificativa: string;
}

export interface CollaboratorEvaluationResult {
    id: number;
    cycleConfigId: number;
    userId: number;
    user: {
        id: number;
        name: string;
        track: string;
    };
    autoEvaluation: AutoAvaliacao;
    evaluation360: Avaliacao360[];
    mentoring: Mentoring;
    reference: Referencia[];
    managerEvaluation?: {
        autoavaliacao: {
            pilares: {
                pilarId: number;
                criterios: {
                    criterioId: number;
                    nota: number;
                    justificativa: string;
                }[];
            }[];
        };
        average: number;
    } | null;
}

export interface CollaboratorAllEvaluations {
    cycle: {
        id: number;
        name: string;
        startDate: string;
        endDate: string;
    };
    autoEvaluation: number;
    evaluation360: number;
    manager: number | null;
    committee: number | null;
}

export interface CollaboratorEvaluationDetails {
    cycle: {
        id: number;
        name: string;
        startDate: string;
        endDate: string;
    };
    collaborator: {
        id: number;
        name: string;
        position: string;
    };
    autoEvaluation: AutoAvaliacao | null;
    evaluation360: Avaliacao360[] | null;
    mentoring: Mentoring | null;
    references: Referencia[] | null;
    managerEvaluation: {
        autoavaliacao: {
            pilares: {
                pilarId: number;
                criterios: {
                    criterioId: number;
                    nota: number;
                    justificativa: string;
                }[];
            }[];
        };
        average: number;
    } | null;
    equalization: {
        score: number;
        justification?: string;
    } | null;
}
