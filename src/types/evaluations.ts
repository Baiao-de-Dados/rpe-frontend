export interface EvaluationCyclesHistory {
    cycles: EvaluationCycle[];
}

export interface EvaluationCycle {
    cycleName: string;
    selfAssessment: EvaluationSelfAssessment;
    evaluation360: Evaluation360History;
    reference: EvaluationReferenceHistory[];
    mentoring: EvaluationMentoringHistory;
}

export interface EvaluationSelfAssessment {
    pillars: EvaluationPillar[];
}

export interface EvaluationPillar {
    pillarName: string;
    criteria: EvaluationCriteria[];
}

export interface EvaluationCriteria {
    criteriaName: string;
    rating: number;
    weight: number;
    managerRating: number;
    justification: string;
}

export interface Evaluation360History {
    evaluation: Evaluation360Item[];
}

export interface Evaluation360Item {
    collaratorName: string;
    collaboratorPosition: string;
    rating: number;
    improvements: string;
    strengths: string;
}

export interface EvaluationReferenceHistory {
    collaratorName: string;
    collaboratorPosition: string;
    justification: string;
}

export interface EvaluationMentoringHistory {
    mentorName: string;
    rating: number;
    justification: string;
}
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
    mentorId: number
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