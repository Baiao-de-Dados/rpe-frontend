// Serviço para comunicação com a IA
export async function avaliarComIA(texto: string) {
    const res = await fetch('http://localhost:5000/avaliar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto }),
    });

    const raw = await res.text();
    let geminiResponse = null;
    try {
        let jsonString = raw;
        // Se vier um objeto com campo resumo, use ele
        try {
            const asObj = JSON.parse(raw);
            if (typeof asObj.resumo === 'string') {
                jsonString = asObj.resumo;
            }
        } catch {
            /* ignore parse errors, fallback para string bruta */
        }
        // Remove blocos de markdown e whitespace
        jsonString = jsonString.replace(/```json|```/g, '').trim();
        // Faz o parse do JSON limpo
        const parsed = JSON.parse(jsonString);
        if (
            typeof parsed.nota === 'number' &&
            Number.isInteger(parsed.nota) &&
            parsed.nota >= 1 &&
            parsed.nota <= 5 &&
            typeof parsed.justificativa === 'string' &&
            parsed.justificativa.trim().length > 0
        ) {
            geminiResponse = parsed;
        } else {
            console.log('Resposta da IA fora do padrão esperado:', raw);
        }
    } catch (e) {
        console.log('Erro ao fazer parse do JSON da IA:', e, raw);
    }
    return { geminiResponse, raw };
}
