import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCycle } from '../useCycle';
import { useToast } from '../useToast';

import { notesEndpoints } from '../../services/api/notes';

import type { GeminiEvaluationResponse } from '../../types/evaluationAI';

export type EvaluationSection = 'Mentoring' | 'Avaliação 360' | 'Autoavaliação' | 'Referências';

export interface NavigationState {
    geminiResponse: GeminiEvaluationResponse;
}

import type { IAEvaluationServiceResponse, GeminiResponse } from '../../types/evaluationAI';
import { AxiosError } from 'axios';

async function evaluationAI(userId: number, cycledId: number): Promise<IAEvaluationServiceResponse> {

    const response = await notesEndpoints.generateAIEvaluation({ userId, cycledId });
    const geminiResponse: GeminiResponse = response.data;

    let error = '';
    let noInsight = false;
    let noIdentification = false;
    let written = '';
    let applicable: string[] = [];

    console.log(geminiResponse)

    if (geminiResponse) {
        switch (geminiResponse.code) {                
            case 'SUCCESS':
                break;
            case 'ERROR':
                console.error('Erro na resposta da IA:', geminiResponse.error);
                error = geminiResponse.error;
                break;
            case 'NO_INSIGHT':
                noInsight = true;
                break;
            case 'NO_IDENTIFICATION':
                noIdentification = true;
                written = geminiResponse.written;
                applicable = geminiResponse.applicable;
                break;
            default:
                error = `Código de resposta desconhecido`;
                console.error(error);
        }
    }

    return { geminiResponse, noInsight, error, noIdentification, written, applicable  };
}

export function useNotesAI() {

    const navigate = useNavigate();

    const { showToast } = useToast();

    const { currentCycle: { isActive } } = useCycle();

    const [error, setError] = useState('');
    const [written, setWritten] = useState('');
    const [modalStep, setModalStep] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [applicable, setApplicable] = useState<string[]>([]);
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

    async function handleEvaluateWithAI(userId: number, cycledId: number) {

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

            if (abortControllerRef.current.signal.aborted) return;

            const { geminiResponse, noInsight, error, noIdentification, written, applicable } = await evaluationAI(userId, cycledId);

            if (abortControllerRef.current.signal.aborted) return;

            if (error) {
                setError(error);
                throw new Error(error);
            }

            setIsEvaluating(true);
            setModalStep(1);

            errorStep = 2;
            await new Promise(r => setTimeout(r, 2000));
            if (abortControllerRef.current.signal.aborted) return;

            if (noInsight) {
                throw new Error('No insight');
            }

            if (noIdentification) {
                setWritten(written ?? '');
                setApplicable(applicable ?? []);
                throw new Error('No identification');
            }

            setModalStep(2);
            setGeneratedEvaluation(geminiResponse.code === 'SUCCESS' ? geminiResponse : null);

            const sections: EvaluationSection[] = [];

            if (geminiResponse.code === 'SUCCESS') {
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
            setGeneratedEvaluation(null);
            setError(e instanceof AxiosError 
                ? e.response?.data.error 
                : 'Ocorreu um erro inesperado ao tentar se conectar com a IA. Tente novamente mais tarde.'
            );
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
        error,
        written,
        applicable,
        evaluationSectionsToShow,
        canContinue
    };
}
