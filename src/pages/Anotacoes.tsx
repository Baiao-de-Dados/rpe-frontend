import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '../components/Typography';
import Button from '../components/Button';
import { Bot } from 'lucide-react';
import CardContainer from '../components/CardContainer';

export default function Anotacoes() {
    const [texto, setTexto] = useState('');
    const [isAvaliando, setIsAvaliando] = useState(false);
    const navigate = useNavigate();

    async function handleAvaliarComIA() {
        setIsAvaliando(true);
        try {
            const res = await fetch('http://localhost:5000/avaliar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ texto })
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
                } catch { /* ignore parse errors, fallback para string bruta */ }
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
            if (geminiResponse) {
                console.log('Enviando para avaliação:', geminiResponse);
                navigate('/avaliacao?section=Mentoring', {
                    state: { geminiResponse }
                });
            } else {
                // Aqui você pode exibir um toast de erro se desejar
                console.log('Resposta inesperada da IA:', raw);
            }
        } catch {
            console.log('Erro ao avaliar com IA');
        } finally {
            setIsAvaliando(false);
        }
    }

    return (
        <div className="w-full flex justify-center py-9 px-2 md:px-8">
            <CardContainer className="w-full min-h-[800px] p-15 pb-0">
                <div className="flex items-center justify-between mb-10 gap-8">
                    <Typography variant="h1" className="text-3xl font-bold mb-0">
                        Anotações
                    </Typography>
                    <div className="flex gap-3">
                        <Button
                            variant="secondary"
                            size="md"
                            disabled={texto.trim().length === 0 || isAvaliando}
                            className="flex items-center gap-2"
                            onClick={handleAvaliarComIA}
                        >
                            {isAvaliando ? 'Avaliando...' : 'Avaliar com IA'}
                            <Bot size={18} />
                        </Button>
                    </div>
                </div>
                <div className="relative">
                    <textarea
                        style={{ backgroundColor: '#f8fdfa' }}
                        className="w-full min-h-[600px] border border-green-100 rounded-lg p-4 text-lg mb-8 resize-none focus:outline-primary-500 focus:bg-white transition-colors"
                        placeholder="Escreva suas anotações aqui..."
                        value={texto}
                        onChange={e => {
                            setTexto(e.target.value);
                        }}
                        readOnly={isAvaliando}
                    />
                </div>
            </CardContainer>
        </div>
    );
}