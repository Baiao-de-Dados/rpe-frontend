import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCycle } from './useCycle';
import { useToast } from './useToast';

import { evaluationAI } from '../services/evaluationAI';

import type { GeminiEvaluationResponse } from '../types/evaluationAI';

export type EvaluationSection = 'Mentoring' | 'Avaliação 360' | 'Autoavaliação' | 'Referências';

export interface NavigationState {
    geminiResponse: GeminiEvaluationResponse;
}

export function useNotes() {

    const navigate = useNavigate();
    const { showToast } = useToast();
    const { currentCycle: { isActive } } = useCycle();

    const [modalStep, setModalStep] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [stepErrors, setStepErrors] = useState([false, false, false]);
    const [evaluationSections, setEvaluationSections] = useState<EvaluationSection[]>([]);
    const [generatedEvaluation, setGeneratedEvaluation] = useState<GeminiEvaluationResponse | null>(null);

    const abortControllerRef = useRef<AbortController | null>(null);

    function resetState() {
        setModalStep(0);
        setStepErrors([false, false, false]);
        setEvaluationSections([]);
        setGeneratedEvaluation(null);
        setIsEvaluating(false);
        abortControllerRef.current = null;
    }

    async function handleEvaluateWithAI(data: { text: string }) {
        resetState(); 
        setIsModalOpen(true);

        if (!isActive) {
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

        let errorStep = 0;
        abortControllerRef.current = new AbortController();

        try {
            errorStep = 1;
            await new Promise(r => setTimeout(r, 1000));
            if (abortControllerRef.current.signal.aborted) return;

            const { geminiResponse, noInsight } = await evaluationAI(
                data.text,
                abortControllerRef.current.signal,
            );

            if (abortControllerRef.current.signal.aborted) return;

            if (!geminiResponse && !noInsight) {
                throw new Error('Resposta da IA inválida');
            }

            setIsEvaluating(true);
            setModalStep(1);

            errorStep = 2;
            await new Promise(r => setTimeout(r, 2000));
            if (abortControllerRef.current.signal.aborted) return;

            if (noInsight) {
                throw new Error('No insight');
            }

            setModalStep(2);
            setGeneratedEvaluation(geminiResponse);

            const sections: EvaluationSection[] = [];

            if (geminiResponse) {
                if (geminiResponse.selfAssessment?.length > 0) {
                    sections.push('Autoavaliação');
                }
                if (geminiResponse.evaluation360?.length > 0) {
                    sections.push('Avaliação 360');
                }
                if (geminiResponse.mentoring) {
                    sections.push('Mentoring');
                }
                if (geminiResponse.references?.length > 0) {
                    sections.push('Referências');
                }
            }

            setEvaluationSections(sections);

            errorStep = 3;
            await new Promise(r => setTimeout(r, 1000));
            if (abortControllerRef.current.signal.aborted) return;

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
            console.log(e);
            setGeneratedEvaluation(null);
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
                geminiResponse: generatedEvaluation,
            };

            const firstSection = evaluationSections[0];
            const sectionParam = firstSection ? `?section=${encodeURIComponent(firstSection)}` : '';

            navigate(`/avaliacao${sectionParam}`, {
                state: navigationState,
            });
        }
    }

    function handleModalCancel() {
        if (modalStep <= 1 && abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        resetState();
        setIsModalOpen(false);
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
