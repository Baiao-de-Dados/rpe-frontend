export interface CommitteeDashboardMetrics {
    totalCollaborators: number;
    pendingEqualizations: number;
    completedEqualizations: number;
    completionPercentage: number;
    daysToDeadline: number;
    deadlineDate: string;
}

export interface CommitteeCollaboratorsSummary {
    collaborator: {
        id: number;
        name: string;
        position: string;
        track?: {
            id: number;
            name: string;
        };
    };
    autoEvaluation: number | null;
    evaluation360: number | null;
    managerEvaluation: number | null;
    committeeEqualization: number | null;
    status: 'pending' | 'completed';
}

export interface CommitteeCollaboratorDetails {
    collaborator: {
        id: number;
        name: string;
        position: string;
        email: string;
        track: { id: number; name: string };
    };
    cycle: {
        id: number;
        name: string;
        startDate: string;
        endDate: string;
    };
    autoEvaluation: {
        score: number;
        criteria: Array<{
            pilarId: number;
            criterionId: number;
            rating: number;
            justification: string;
        }>;
    } | null;
    evaluation360: Array<{
        collaratorName: string;
        collaboratorPosition: string;
        rating: number;
        improvements: string;
        strengths: string;
    }>;
    managerEvaluation: {
        score: number;
        criteria: Array<{
            pilarId: number;
            criterionId: number;
            rating: number;
            justification: string;
        }>;
    } | null;
    committeeEqualization: {
        finalScore: number;
        comments: string;
        committee: {
            id: number;
            name: string;
            position: string;
        };
        lastUpdated: string;
        aiSummary?: {
            code: string;
            rating?: number;
            detailedAnalysis?: string;
            summary?: string;
            discrepancies?: string;
        };
    } | null;
}

export interface CommitteeEqualizationPayload {
    cycleConfigId: number;
    collaboratorId: number;
    equalization: {
        score: number;
        justification: string;
        changeReason?: string; // ✅ NOVO: motivo da mudança
        aiSummary?: {
            code: string;
            rating?: number;
            detailedAnalysis?: string;
            summary?: string;
            discrepancies?: string;
        }; // ✅ NOVO: resumo da IA
    };
}

export interface CommitteeEqualizationResponse {
    message: string;
    equalization: {
        id: number;
        collaboratorId: number;
        cycleId: number;
        committeeId: number; // ✅ NOVO: quem fez
        score: number;
        justification: string;
        createdAt: string;
        updatedAt: string;
        committee: {
            id: number;
            name: string;
            position: string;
        };
    };
    history?: { // ✅ NOVO: histórico da mudança (apenas em updates)
        previousScore: number | null;
        newScore: number;
        changeReason: string;
        changedBy: number;
        changedAt: string;
    };
}

export interface CommitteeEqualization {
    id: number;
    collaboratorId: number;
    cycleId: number;
    committeeId: number; // ✅ NOVO
    score: number;
    justification: string;
    aiSummary?: {
        code: string;
        rating?: number;
        detailedAnalysis?: string;
        summary?: string;
        discrepancies?: string;
    };
    createdAt: string;
    updatedAt: string;
    committee: {
        id: number;
        name: string;
        position: string;
    };
}

// ✅ NOVO: Interface para histórico
export interface CommitteeEqualizationHistory {
    id: number;
    equalizationId: number;
    committeeId: number;
    previousScore: number | null;
    newScore: number | null;
    previousJustification: string | null;
    newJustification: string;
    changeReason: string | null;
    createdAt: string;
    committee: {
        id: number;
        name: string;
        position: string;
    };
}

// ✅ NOVO: Interface para resumo da IA
export interface CommitteeAiSummary {
    collaborator: {
        id: number;
        name: string;
    };
    cycle: {
        id: number;
        name: string;
    };
    aiSummary: {
        code: string;
        rating?: number;
        detailedAnalysis?: string;
        summary?: string;
        discrepancies?: string;
    };
    committee: {
        id: number;
        name: string;
        position: string;
    };
    generatedAt: string;
}

// ✅ NOVO: Interface para o conteúdo do resumo da IA
export interface AiSummaryContent {
    code: string;
    rating?: number;
    detailedAnalysis?: string;
    summary?: string;
    discrepancies?: string;
} 