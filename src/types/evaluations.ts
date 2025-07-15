export type SelfAssessmentDraft = {
    pillarId: number;
    criteriaId: number;
    rating: number;
    justification: string;
};

export type Evaluation360Draft = {
    evaluateeId: number;
    strengths: string;
    improvements: string;
    rating: number;
};

export type MentoringDraft = {
    justification: string;
    rating: number;
};

export type ReferencesDraft = {
    collaboratorId: number;
    justification: string;
};
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

export interface CollaboratorEvaluateDraft {
    cycleId: number;
    draft: {
        selfAssessment: SelfAssessmentDraft[];
        evaluation360: Evaluation360Draft[];
        mentoring: MentoringDraft;
        references: ReferencesDraft[];
    };
}

export type SelfAssessmentFormItem = { pilarId: number; criterionId: number; rating: number; justification: string };
export type Evaluation360FormItem = { collaboratorId: number; strengths: string; improvements: string; rating: number };
export type ReferencesFormItem = { collaboratorId: number; justification: string };