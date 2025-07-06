import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCycle } from './useCycle';
import { useToast } from './useToast';

import { avaliarComIA } from '../services/iaService';

export function useAnotacoes() {
    
    const navigate = useNavigate();

    const { showToast } = useToast();

    const { currentCycle } = useCycle();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState(0);
    const [isAvaliando, setIsAvaliando] = useState(false);
    const [stepErrors, setStepErrors] = useState([false, false, false]);
    const [avaliacaoGerada, setAvaliacaoGerada] = useState<unknown>(null);
    const [avaliacaoSections, setAvaliacaoSections] = useState<string[]>([]);
    
    const abortControllerRef = useRef<AbortController | null>(null);

    async function handleAvaliarComIA(data: { text: string }) {
        if (!currentCycle || !currentCycle.isOpen) {
            showToast(
                'Não há ciclo de avaliação aberto no momento. Aguarde a abertura de um novo ciclo.',
                'error',
                {
                    title: 'Ciclo de Avaliação Fechado',
                    duration: 8000,
                },
            );
            return;
        }
        
        setModalOpen(true);
        setStepErrors([false, false, false]);
        setAvaliacaoSections([]);
        let errorStep = 0;
        abortControllerRef.current = new AbortController();
        
        try {
            errorStep = 1;
            await new Promise(r => setTimeout(r, 1000));
            const { geminiResponse, semInsight } = await avaliarComIA(
                data.text,
                abortControllerRef.current.signal,
            );
            setIsAvaliando(true);
            setModalStep(1);

            errorStep = 2;
            await new Promise(r => setTimeout(r, 2000));
            if (semInsight) {
                setAvaliacaoGerada(null);
                throw new Error('Sem insight');
            }
            setModalStep(2);

            setAvaliacaoGerada(geminiResponse || null);
            setAvaliacaoSections([
                'Mentoring',
                'Avaliação 360',
                'Autoavaliação',
                'Referências',
            ]);

            errorStep = 3;
            await new Promise(r => setTimeout(r, 1000));
            setModalStep(3);
        } catch (e: unknown) {
            switch (errorStep) {
                case 1:
                    setStepErrors([true, false, false]);
                    break;
                case 2:
                    setStepErrors([false, true, false]);
                    break;
                case 3:
                    setStepErrors([false, false, true]);
                    break;
                default:
                    setStepErrors([true, false, false]);
            }
            setAvaliacaoGerada(null);
            setIsAvaliando(false);
            console.log('Erro ao avaliar com IA', e);
        } finally {
            setIsAvaliando(false);
            abortControllerRef.current = null;
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

    function handleModalCancel() {
        setModalOpen(false);
        setModalStep(0);
        setAvaliacaoGerada(null);
        setIsAvaliando(false);
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    }

    const steps = [
        {
            label: 'Analisando anotações',
            completed: modalStep > 0,
            error: stepErrors[0],
        },
        {
            label: 'Gerando avaliações',
            completed: modalStep > 1,
            error: stepErrors[1],
        },
        {
            label: 'Avaliação gerada',
            completed: modalStep > 2,
            error: stepErrors[2],
        },
    ];

    const canContinue = modalStep === 3 && !!avaliacaoGerada && stepErrors.every(e => !e);
    const avaliacaoSectionsToShow = modalStep === 3 && stepErrors.every(e => !e) ? avaliacaoSections : [];

    return {
        isAvaliando,
        modalOpen,
        handleAvaliarComIA,
        handleModalContinue,
        handleModalCancel,
        steps,
        avaliacaoSectionsToShow,
        canContinue,
    };
}
