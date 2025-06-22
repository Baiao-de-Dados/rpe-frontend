import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '../components/Typography';
import Button from '../components/Button';
import { Sparkles, Check, X, Bot } from 'lucide-react';
import CardContainer from '../components/CardContainer';

export default function Anotacoes() {
    const [texto, setTexto] = useState('');
    const [resumo, setResumo] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showActions, setShowActions] = useState(false);
    const [isAvaliando, setIsAvaliando] = useState(false);
    const navigate = useNavigate();

    async function handleGerarResumo() {
        setIsLoading(true);
        setResumo('');
        setShowActions(false);
        try {
            const res = await fetch('http://localhost:5000/resumir', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ texto })
            });
            const data = await res.json();
            if (typeof data.resumo === 'string') {
                const textoResumo = (data.resumo || '').toString();
                if (!textoResumo) return;
                let i = 0;
                let acumulado = '';
                function animate() {
                    acumulado += textoResumo.charAt(i);
                    setResumo(acumulado);
                    i++;
                    if (i < textoResumo.length) {
                        setTimeout(animate, 20);
                    } else {
                        setShowActions(true);
                    }
                }
                animate();
            }
        } catch {
            setResumo('[Erro ao gerar resumo]');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleAvaliarComIA() {
        setIsAvaliando(true);
        try {
            const res = await fetch('http://localhost:5000/avaliar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ texto })
            });

            const raw = await res.text();
            let nota = null;
            let justificativa = '';
            try {
                // Regex para extrair "Nota: <número>" e "Justificativa: <texto>"
                const notaMatch = raw.match(/Nota:\s*(\d+)/i);
                const justificativaMatch = raw.match(/Justificativa:\s*([\s\S]*)/i);
                if (notaMatch) {
                    nota = parseInt(notaMatch[1], 10);
                }
                if (justificativaMatch) {
                    justificativa = justificativaMatch[1].trim();
                }
            } catch (e) {
                console.log('Erro ao extrair nota/justificativa:', e, raw);
            }
            if (typeof nota === 'number' && justificativa) {
                console.log('Enviando para avaliação:', { nota, justificativa });
                navigate('/avaliacao?section=Mentoring', {
                    state: {
                        mentoringNota: nota,
                        mentoringJustificativa: justificativa,
                        nota,
                        justificativa
                    }
                });
            } else {
                console.log('Resposta inesperada da IA:', raw);
            }
        } catch {
            console.log('Erro ao avaliar com IA');
        } finally {
            setIsAvaliando(false);
        }
    }

    function handleAccept() {
        setShowActions(false);
        // Aqui você pode adicionar lógica para salvar ou processar o resumo aceito
    }
    function handleReject() {
        setShowActions(false);
        setResumo('');
    }

    const textoComResumo = resumo ? texto + '\n\n' + resumo : texto;

    return (
        <div className="w-full flex justify-center py-9 px-2 md:px-8">
            <CardContainer className="w-full min-h-[800px] p-15 pb-0">
                <div className="flex items-center justify-between mb-10 gap-8">
                    <Typography variant="h1" className="text-3xl font-bold mb-0">
                        Anotações
                    </Typography>
                    <div className="flex gap-3">
                        <Button
                            variant="primary"
                            size="md"
                            disabled={texto.trim().length === 0 || isLoading}
                            className="flex items-center gap-3"
                            onClick={handleGerarResumo}
                        >
                            {isLoading ? 'Gerando...' : 'Gerar resumo'}
                            <Sparkles size={18} className="-ml-1" />
                        </Button>
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
                        value={textoComResumo}
                        onChange={e => {
                            setTexto(e.target.value);
                            setResumo('');
                            setShowActions(false);
                        }}
                        readOnly={isLoading || !!resumo}
                    />
                    {showActions && (
                        <div className="absolute right-8 top-8 flex gap-3 z-10">
                            <button
                                onClick={handleAccept}
                                className="transition-colors p-0 bg-transparent border-none focus:outline-none"
                                style={{ lineHeight: 0, background: 'none', border: 'none', cursor: 'pointer' }}
                                title="Aceitar resumo"
                            >
                                <Check size={28} className="text-primary-500 hover:text-primary-700 transition-colors cursor-pointer" />
                            </button>
                            <button
                                onClick={handleReject}
                                className="transition-colors p-0 bg-transparent border-none focus:outline-none"
                                style={{ lineHeight: 0, background: 'none', border: 'none', cursor: 'pointer' }}
                                title="Rejeitar resumo"
                            >
                                <X size={28} className="text-red-500 hover:text-red-700 transition-colors cursor-pointer" />
                            </button>
                        </div>
                    )}
                </div>
            </CardContainer>
        </div>
    );
}