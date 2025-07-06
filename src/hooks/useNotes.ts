import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCycle } from './useCycle';
import { useToast } from './useToast';

import { avaliarComIA, type GeminiEvaluationResponse } from '../services/iaService';

export interface NavigationState {
    geminiResponse: GeminiEvaluationResponse;
}

export function useNotes() {
    
    const navigate = useNavigate();

    const { showToast } = useToast();

    const { currentCycle } = useCycle();

    const [modalStep, setModalStep] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [stepErrors, setStepErrors] = useState([false, false, false]);
    const [evaluationSections, setEvaluationSections] = useState<string[]>([]);
    const [generatedEvaluation, setGeneratedEvaluation] = useState<GeminiEvaluationResponse | null>(null);
    
    const abortControllerRef = useRef<AbortController | null>(null);

    async function handleEvaluateWithAI(data: { text: string }) {
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
        
        setIsModalOpen(true);
        setStepErrors([false, false, false]);
        setEvaluationSections([]);
        let errorStep = 0;
        abortControllerRef.current = new AbortController();
        
        try {
            errorStep = 1;
            await new Promise(r => setTimeout(r, 1000));
            const { geminiResponse, noInsight } = await avaliarComIA(
                data.text,
                abortControllerRef.current.signal,
            );
            setIsEvaluating(true);
            setModalStep(1);

            errorStep = 2;
            await new Promise(r => setTimeout(r, 2000));
            if (noInsight) {
                setGeneratedEvaluation(null);
                throw new Error('No insight');
            }
            setModalStep(2);

            setGeneratedEvaluation(geminiResponse);
            setEvaluationSections([
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
            setGeneratedEvaluation(null);
            setIsEvaluating(false);
            console.log('Error evaluating with AI', e);
        } finally {
            setIsEvaluating(false);
            abortControllerRef.current = null;
        }
    }

    function handleModalContinue() {
        setIsModalOpen(false);
        setModalStep(0);
        if (generatedEvaluation) {
            const navigationState: NavigationState = { 
                geminiResponse: generatedEvaluation 
            };
            navigate('/avaliacao?section=Mentoring', {
                state: navigationState,
            });
        }
    }

    function handleModalCancel() {
        setIsModalOpen(false);
        setModalStep(0);
        setGeneratedEvaluation(null);
        setIsEvaluating(false);
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

    const canContinue = modalStep === 3 && !!generatedEvaluation && stepErrors.every(e => !e);
    const evaluationSectionsToShow = modalStep === 3 && stepErrors.every(e => !e) ? evaluationSections : [];

    return {
        isEvaluating,
        isModalOpen,
        handleEvaluateWithAI,
        handleModalContinue,
        handleModalCancel,
        steps,
        evaluationSectionsToShow,
        canContinue,
    };
}
