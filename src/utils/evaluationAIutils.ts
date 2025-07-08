import type { SelfSelfAssessmentItem, Evaluation360Item, MentoringItem, ReferencesItem, GeminiEvaluationResponse,GeminiNoInsightResponse } from '../types/evaluationAI';

export function isValidNoInsightResponse(data: unknown): data is GeminiNoInsightResponse {
    const isValid = (
        typeof data === 'object' &&
        data !== null &&
        'code' in data &&
        (data as Record<string, unknown>).code === 'NO_INSIGHT'
    );
    console.log('isValidNoInsightResponse:', isValid);
    return isValid;
}

export function isValidGeminiEvaluationResponse(data: unknown): data is GeminiEvaluationResponse {
    if (typeof data !== 'object' || data === null) {
        console.log('isValidGeminiEvaluationResponse: false');
        return false;
    }
    
    const obj = data as Record<string, unknown>;
    const isValid = (
        (obj.mentoring === null || isValidMentoringItem(obj.mentoring)) && 
        Array.isArray(obj.references) && obj.references.every(isValidReferencesItem) &&
        Array.isArray(obj.evaluation360) && obj.evaluation360.every(isValidEvaluation360Item) &&
        Array.isArray(obj.selfAssessment) && obj.selfAssessment.every(isValidSelfAssessmentItem) 
    );
    console.log('isValidGeminiEvaluationResponse:', isValid);
    return isValid;
}

export function isValidSelfAssessmentItem(item: unknown): item is SelfSelfAssessmentItem {
    if (typeof item !== 'object' || item === null) {
        console.log('isValidSelfAssessmentItem: false');
        return false;
    }

    const obj = item as Record<string, unknown>;
    const isValid = (
        typeof obj.criterionId === 'string' && obj.criterionId.trim().length > 0 &&
        typeof obj.rating === 'number' && Number.isInteger(obj.rating) && obj.rating >= 1 && obj.rating <= 5 &&
        typeof obj.justification === 'string' && obj.justification.trim().length > 0
    );
    console.log('isValidSelfAssessmentItem:', isValid);
    return isValid;
}

export function isValidEvaluation360Item(item: unknown): item is Evaluation360Item {
    if (typeof item !== 'object' || item === null) {
        console.log('isValidEvaluation360Item: false');
        return false;
    }

    const obj = item as Record<string, unknown>;
    const isValid = (
        typeof obj.collaboratorId === 'string' && obj.collaboratorId.trim().length > 0 &&
        typeof obj.rating === 'number' && Number.isInteger(obj.rating) && obj.rating >= 1 && obj.rating <= 5 &&
        typeof obj.strengths === 'string' && obj.strengths.trim().length > 0 &&
        typeof obj.improvements === 'string' && obj.improvements.trim().length > 0
    );
    console.log('isValidEvaluation360Item:', isValid);
    return isValid;
}

export function isValidMentoringItem(item: unknown): item is MentoringItem {
    if (typeof item !== 'object' || item === null) {
        console.log('isValidMentoringItem: false');
        return false;
    }

    const obj = item as Record<string, unknown>;
    const isValid = (
        typeof obj.rating === 'number' && Number.isInteger(obj.rating) && obj.rating >= 1 && obj.rating <= 5 &&
        typeof obj.justification === 'string' && obj.justification.trim().length > 0
    );
    console.log('isValidMentoringItem:', isValid);
    return isValid;
}

export function isValidReferencesItem(item: unknown): item is ReferencesItem {
    if (typeof item !== 'object' || item === null) {
        console.log('isValidReferencesItem: false');
        return false;
    }

    const obj = item as Record<string, unknown>;
    const isValid = (
        typeof obj.collaboratorId === 'string' && obj.collaboratorId.trim().length > 0 &&
        typeof obj.justification === 'string' && obj.justification.trim().length > 0
    );
    console.log('isValidReferencesItem:', isValid);
    return isValid;
}
