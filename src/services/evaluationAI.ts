import type { IAEvaluationServiceResponse } from '../types/evaluationAI';
import { isValidNoInsightResponse, isValidGeminiEvaluationResponse } from '../utils/evaluationAIutils';

export async function evaluationAI(text: string, signal?: AbortSignal): Promise<IAEvaluationServiceResponse> {

    const response = await fetch('http://localhost:5000/avaliar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
        signal,
    }).then(response => response.json())

    let geminiResponse = null;
    let noInsight = false;

    if (response) {
        if (isValidNoInsightResponse(response)) {
            noInsight = true;
        } else if (isValidGeminiEvaluationResponse(response)) {
            geminiResponse = response;
        } else {
            console.log('Resposta da IA fora do padrão esperado:', response);
        }
    }

    return { geminiResponse, noInsight };

}


