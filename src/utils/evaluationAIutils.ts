import type { SelfSelfAssessmentItem, Evaluation360Item, MentoringItem, ReferencesItem, GeminiEvaluationResponse,GeminiNoInsightResponse } from '../types/evaluationAI';

export function isValidNoInsightResponse(data: unknown): data is GeminiNoInsightResponse {
    const isValid = (
        typeof data === 'object' &&
        data !== null &&
        'code' in data &&
        (data as Record<string, unknown>).code === 'NO_INSIGHT'
    );
    return isValid;
}

export function isValidGeminiEvaluationResponse(data: unknown): data is GeminiEvaluationResponse {
    if (typeof data !== 'object' || data === null) {
        return false;
    }
    
    const obj = data as Record<string, unknown>;
    const isValid = (
        (obj.mentoring === null || isValidMentoringItem(obj.mentoring)) && 
        Array.isArray(obj.references) && obj.references.every(isValidReferencesItem) &&
        Array.isArray(obj.evaluation360) && obj.evaluation360.every(isValidEvaluation360Item) &&
        Array.isArray(obj.selfAssessment) && obj.selfAssessment.every(isValidSelfAssessmentItem) 
    );
    return isValid;
}

export function isValidSelfAssessmentItem(item: unknown): item is SelfSelfAssessmentItem {
    if (typeof item !== 'object' || item === null) {
        return false;
    }

    const obj = item as Record<string, unknown>;
    const isValid = (
        typeof obj.criteriaId === 'string' && obj.criteriaId.trim().length > 0 &&
        typeof obj.pillarId === 'string' && obj.criteriaId.trim().length > 0 &&
        typeof obj.rating === 'number' && Number.isInteger(obj.rating) && obj.rating >= 1 && obj.rating <= 5 &&
        typeof obj.justification === 'string' && obj.justification.trim().length > 0
    );
    return isValid;
}

export function isValidEvaluation360Item(item: unknown): item is Evaluation360Item {
    if (typeof item !== 'object' || item === null) {
        return false;
    }

    const obj = item as Record<string, unknown>;
    const isValid = (
        typeof obj.collaboratorId === 'string' && obj.collaboratorId.trim().length > 0 &&
        typeof obj.rating === 'number' && Number.isInteger(obj.rating) && obj.rating >= 1 && obj.rating <= 5 &&
        typeof obj.strengths === 'string' && obj.strengths.trim().length > 0 &&
        typeof obj.improvements === 'string' && obj.improvements.trim().length > 0
    );
    return isValid;
}

export function isValidMentoringItem(item: unknown): item is MentoringItem {
    if (typeof item !== 'object' || item === null) {
        return false;
    }

    const obj = item as Record<string, unknown>;
    const isValid = (
        typeof obj.rating === 'number' && Number.isInteger(obj.rating) && obj.rating >= 1 && obj.rating <= 5 &&
        typeof obj.justification === 'string' && obj.justification.trim().length > 0
    );
    return isValid;
}

export function isValidReferencesItem(item: unknown): item is ReferencesItem {
    if (typeof item !== 'object' || item === null) {
        return false;
    }

    const obj = item as Record<string, unknown>;
    const isValid = (
        typeof obj.collaboratorId === 'string' && obj.collaboratorId.trim().length > 0 &&
        typeof obj.justification === 'string' && obj.justification.trim().length > 0
    );
    return isValid;
}
