export interface SelfSelfAssessmentItem {
    pillarId: string;
    criteriaId: string;
    rating: number;
    justification: string
}

export interface Evaluation360Item {
    collaboratorId: string;
    rating: number;
    strengths: string;
    improvements: string
}

export interface MentoringItem {
    rating: number;
    justification: string
}

export interface ReferencesItem {
    collaboratorId: string;
    justification: string
}

export interface GeminiEvaluationResponse {
    code: 'SUCCESS';
    selfAssessment: SelfSelfAssessmentItem[];
    evaluation360: Evaluation360Item[];
    mentoring: MentoringItem | null;
    references: ReferencesItem[];
}

export interface GeminiNoInsightResponse {
    code: 'NO_INSIGHT';
}

export interface GeminiErrorResponse {
    code: 'ERROR';
    error: string;
}

export type GeminiResponse = GeminiEvaluationResponse | GeminiNoInsightResponse | GeminiErrorResponse;

export type IAEvaluationServiceResponse = { 
    geminiResponse: GeminiResponse;
    noInsight: boolean;
    error?: string;
}