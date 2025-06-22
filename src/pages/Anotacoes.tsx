import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '../components/Typography';
import Button from '../components/Button';
import { Sparkles } from 'lucide-react';
import CardContainer from '../components/CardContainer';
import { avaliarComIA } from '../services/iaService';
import AnotacoesStepsModal from '../components/AnotacoesStepsModal';

export default function Anotacoes() {
    const [texto, setTexto] = useState('');
    const [isAvaliando, setIsAvaliando] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState(0);
    const [avaliacaoGerada, setAvaliacaoGerada] = useState<unknown>(null); // Ajusta o tipo para unknown, evitando 'any'
    const navigate = useNavigate();

    async function handleAvaliarComIA() {
        setModalOpen(true);

        try {
            const { geminiResponse } = await avaliarComIA(texto);
            setIsAvaliando(true);
            setModalStep(1);
            await new Promise(r => setTimeout(r, 2000));
            setModalStep(2);
            setAvaliacaoGerada(geminiResponse || null);
            await new Promise(r => setTimeout(r, 2000));
            setModalStep(3);
            // Step 3: Avaliação gerada
        } catch {
            setAvaliacaoGerada(null);
            setModalStep(3);
            console.log('Erro ao avaliar com IA');
        } finally {
            setIsAvaliando(false);
        }
    }

    function handleModalContinue() {
        setModalOpen(false);
        setModalStep(0);
        if (avaliacaoGerada) {
            navigate('/avaliacao?section=Mentoring', {
                state: { geminiResponse: avaliacaoGerada },
            });
        }
    }

    const steps = [
        { label: 'Analisando anotações', completed: modalStep > 0 },
        { label: 'Gerando avaliações', completed: modalStep > 1 },
        { label: 'Avaliação gerada', completed: modalStep > 2 },
    ];

    return (
        <>
            <AnotacoesStepsModal
                open={modalOpen}
                steps={steps}
                onCancel={() => {
                    setModalOpen(false);
                    setModalStep(0);
                    setAvaliacaoGerada(null);
                }}
                onContinue={handleModalContinue}
                canContinue={modalStep === 3 && !!avaliacaoGerada}
            />
            <div className="w-full flex justify-center py-9 px-2 md:px-8">
                <CardContainer className="w-full min-h-[800px] p-15 pb-0">
                    <div className="flex items-center justify-between mb-10 gap-8">
                        <Typography
                            variant="h1"
                            className="text-3xl font-bold mb-0"
                        >
                            Anotações
                        </Typography>
                        <div className="flex gap-3">
                            <Button
                                variant="secondary"
                                size="md"
                                disabled={
                                    texto.trim().length === 0 ||
                                    isAvaliando ||
                                    modalOpen
                                }
                                className="flex items-center gap-2"
                                onClick={handleAvaliarComIA}
                            >
                                {isAvaliando
                                    ? 'Avaliando...'
                                    : 'Avaliar com IA'}
                                <Sparkles size={18} />
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
        </>
    );
}
