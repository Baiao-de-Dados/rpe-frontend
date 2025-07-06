export interface GeminiEvaluationItem {
    rating: number;
    justification: string;
}

export interface GeminiEvaluationResponse {
    selfAssessment: GeminiEvaluationItem[];
    evaluation360: GeminiEvaluationItem[];
    mentoring: GeminiEvaluationItem | null;
    references: GeminiEvaluationItem[];
}

export interface GeminiNoInsightResponse {
    code: 'NO_INSIGHT';
}

interface IAServiceResponse {
    geminiResponse: GeminiEvaluationResponse | null;
    noInsight: boolean;
}

export async function avaliarComIA(text: string, signal?: AbortSignal): Promise<IAServiceResponse> {
    const response = await fetch('http://localhost:5000/avaliar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
        signal,
    });

    
    const parsed = await response.json();

    let geminiResponse = null;
    let noInsight = false;

    if (parsed) {
        if (isValidNoInsightResponse(parsed)) {
            noInsight = true;
        } else if (isValidGeminiEvaluationResponse(parsed)) {
            geminiResponse = parsed;
        } else {
            console.log('Resposta da IA fora do padrão esperado:', parsed);
        }
    }
    return { geminiResponse, noInsight };
}

function isValidNoInsightResponse(data: unknown): data is GeminiNoInsightResponse {
    return (
        typeof data === 'object' &&
        data !== null &&
        'code' in data &&
        (data as Record<string, unknown>).code === 'NO_INSIGHT'
    );
}

function isValidGeminiEvaluationResponse(data: unknown): data is GeminiEvaluationResponse {
    if (typeof data !== 'object' || data === null) return false;
    
    const obj = data as Record<string, unknown>;
    
    return (
        Array.isArray(obj.selfAssessment) && (obj.selfAssessment.length == 0 || obj.selfAssessment.every(isValidEvaluationItem)) &&
        Array.isArray(obj.evaluation360) && (obj.evaluation360.length == 0 || obj.evaluation360.every(isValidEvaluationItem)) &&
        (obj.mentoring === null || isValidEvaluationItem(obj.mentoring)) &&
        Array.isArray(obj.references) && (obj.references.length == 0 || obj.references.every(isValidEvaluationItem))
    );
}

function isValidEvaluationItem(item: unknown): item is GeminiEvaluationItem {
    if (typeof item !== 'object' || item === null) return false;
    
    const obj = item as Record<string, unknown>;
    const rating = obj.rating;
    const justification = obj.justification;
    
    return (
        typeof rating === 'number' &&
        Number.isInteger(rating) &&
        rating >= 1 &&
        rating <= 5 &&
        typeof justification === 'string' &&
        justification.trim().length > 0
    );
}


