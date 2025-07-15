export interface CollaboratorEvaluation {
    id: number;
    cycleConfigId: number;
    userId: number;
    sentDate: string;
    user: {
        id: number;
        name: string;
        track: string;
    };
    autoEvaluation: {
        pilares: Array<{
            pilarId: number;
            criterios: Array<{
                criterioId: number;
                nota: number;
                justificativa: string;
            }>;
        }>;
    };
    evaluation360: Array<{
        avaliadoId: number;
        pontosFortes: string;
        pontosMelhoria: string;
        score: number;
    }>;
    mentoring: {
        mentorId: number;
        justificativa: string;
        score: number;
    };
    reference: Array<{
        colaboradorId: number;
        justificativa: string;
    }>;
}
export interface CollaboratorEvaluatePayload {
    cycleConfigId: number;
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
    avaliacao360: {
        avaliadoId: number,
        pontosFortes: string,
        pontosMelhoria: string,
        score: number
    }[];
    mentoring: {
        mentorId: number;
        justificativa: string;
        score: number;
    };
    referencias: {
        colaboradorId: number;
        justificativa: string;
    }[];
}
