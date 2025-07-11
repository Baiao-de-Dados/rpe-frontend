import type { IAEvaluationServiceResponse, GeminiResponse } from '../types/evaluationAI';

export async function evaluationAI(text: string, signal?: AbortSignal): Promise<IAEvaluationServiceResponse> {

    const response: GeminiResponse = await fetch('http://localhost:5000/avaliar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
        signal,
    }).then(response => response.json());

    const geminiResponse = response;

    let error = '';
    let noInsight = false;

    if (response) {
        switch (response.code) {                
            case 'SUCCESS':
                break;
            case 'ERROR':
                console.error('Erro na resposta da IA:', response.error);
                error = response.error;
                break
            case 'NO_INSIGHT':
                noInsight = true;
                break
            default:
                console.error('Código de resposta desconhecido');
                error = `Código de resposta desconhecido`;
        }
    }

    return { geminiResponse, noInsight, error };

}


