import { useState, useEffect, type ReactNode } from 'react';

import { CycleContext } from './CycleContextDefinition';
import type { Cycle, EvaluationStatus, CycleContextType } from './CycleContextDefinition';

const mockCurrentCycle: Cycle = {
    id: '2025.1',
    nome: '2025.1',
    isOpen: true,
    allTracksSet: false,
    dataInicio: '2025-01-01',
    dataFim: '2025-06-29',
};

export const CycleProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentCycle, setCurrentCycle] = useState<Cycle | null>(null);
    const [evaluationStatus, setEvaluationStatus] = useState<EvaluationStatus | null>(null);

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

    useEffect(() => {
        checkCycleStatus();
    }, []);

    const value: CycleContextType = {
        currentCycle,
        evaluationStatus,
        isLoading,
        checkCycleStatus,
    };

    return (
        <CycleContext.Provider value={value}>{children}</CycleContext.Provider>
    );
};
