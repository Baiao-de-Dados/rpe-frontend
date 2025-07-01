import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { CycleContext } from './CycleContextDefinition';
import type {
    Cycle,
    EvaluationStatus,
    CycleContextType,
} from './CycleContextDefinition';
import { useToast } from '../hooks/useToast';

const mockCurrentCycle: Cycle = {
    id: '2025.1',
    nome: '2025.1',
    isOpen: false,
    allTracksSet: true,
    dataInicio: '2025-01-01',
    dataFim: '2025-06-29',
};

export const CycleProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [currentCycle, setCurrentCycle] = useState<Cycle | null>(null);
    const [evaluationStatus, setEvaluationStatus] =
        useState<EvaluationStatus | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { showToast } = useToast();

    const checkCycleStatus = async () => {
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            setCurrentCycle(mockCurrentCycle);

            const savedStatus = localStorage.getItem(
                `evaluation_${mockCurrentCycle.id}`,
            );
            if (savedStatus) {
                setEvaluationStatus(JSON.parse(savedStatus));
            } else {
                setEvaluationStatus({
                    cycleId: mockCurrentCycle.id,
                    isSubmitted: false,
                });
            }
        } catch (error) {
            console.error('Erro ao carregar status do ciclo:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const submitEvaluation = async (): Promise<boolean> => {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const success = Math.random() > 0.1;

            if (success && currentCycle) {
                const newStatus: EvaluationStatus = {
                    cycleId: currentCycle.id,
                    isSubmitted: true,
                    submittedAt: new Date().toISOString(),
                };

                localStorage.setItem(
                    `evaluation_${currentCycle.id}`,
                    JSON.stringify(newStatus),
                );
                setEvaluationStatus(newStatus);

                showToast(
                    'Sua avaliação foi enviada com sucesso! Você será notificado em breve quando o processo estiver concluído.',
                    'success',
                    {
                        title: 'Avaliação Enviada! 🎉',
                        duration: 10000,
                    },
                );
                return true;
            } else {
                showToast(
                    'Não foi possível enviar sua avaliação no momento. Verifique sua conexão com a internet e tente novamente.',
                    'error',
                    {
                        title: 'Falha no Envio',
                        duration: 8000,
                    },
                );
                return false;
            }
        } catch (error) {
            console.error('Erro no envio:', error);
            showToast(
                'Ocorreu um erro técnico durante o envio. Nossa equipe foi notificada. Tente novamente em alguns minutos.',
                'error',
                {
                    title: 'Erro Técnico',
                    duration: 10000,
                },
            );
            return false;
        }
    };

    useEffect(() => {
        checkCycleStatus();
    }, []);

    const value: CycleContextType = {
        currentCycle,
        evaluationStatus,
        isLoading,
        checkCycleStatus,
        submitEvaluation,
    };

    return (
        <CycleContext.Provider value={value}>{children}</CycleContext.Provider>
    );
};
