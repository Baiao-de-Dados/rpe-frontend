import { useState, useEffect, useCallback, type ReactNode } from 'react';

import { CycleContext } from './CycleContextDefinition';
import type { Cycle, EvaluationStatus, CycleContextType } from './CycleContextDefinition';

const mockCurrentCycle: Cycle = {
    id: '2025.2',
    nome: '2025.2',
    isOpen: false,
    allTracksSet: false,
    dataInicio: '2025-01-01',
    dataFim: '2025-06-29',
};

const CYCLE_STORAGE_KEY = 'cycle_state';

export const CycleProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentCycle, setCurrentCycle] = useState<Cycle | null>(null);
    const [evaluationStatus, setEvaluationStatus] = useState<EvaluationStatus | null>(null);

    // Função para carregar o ciclo do localStorage
    const loadCycleFromStorage = (): Cycle => {
        try {
            const savedCycle = localStorage.getItem(CYCLE_STORAGE_KEY);
            if (savedCycle) {
                const parsedCycle = JSON.parse(savedCycle);
                // Merge com o mockCurrentCycle para garantir que todos os campos estejam presentes
                return { ...mockCurrentCycle, ...parsedCycle };
            }
        } catch (error) {
            console.error('Erro ao carregar ciclo do localStorage:', error);
        }
        return mockCurrentCycle;
    };

    // Função para salvar o ciclo no localStorage
    const saveCycleToStorage = (cycle: Cycle) => {
        try {
            localStorage.setItem(CYCLE_STORAGE_KEY, JSON.stringify(cycle));
        } catch (error) {
            console.error('Erro ao salvar ciclo no localStorage:', error);
        }
    };

    const checkCycleStatus = useCallback(async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const loadedCycle = loadCycleFromStorage();
            setCurrentCycle(loadedCycle);

            const savedStatus = localStorage.getItem(
                `evaluation_${loadedCycle.id}`,
            );
            if (savedStatus) {
                setEvaluationStatus(JSON.parse(savedStatus));
            } else {
                setEvaluationStatus({
                    cycleId: loadedCycle.id,
                    isSubmitted: false,
                });
            }
        } catch (error) {
            console.error('Erro ao carregar status do ciclo:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        checkCycleStatus();
    }, [checkCycleStatus]);

    const updateAllTracksSet = (value: boolean) => {
        setCurrentCycle(prev => {
            if (!prev) return null;
            const updatedCycle = { ...prev, allTracksSet: value };
            saveCycleToStorage(updatedCycle);
            return updatedCycle;
        });
    };

    const updateCycleStatus = (isOpen: boolean, endDate?: string) => {
        setCurrentCycle(prev => {
            if (!prev) return null;
            const updatedCycle = { 
                ...prev, 
                isOpen,
                ...(endDate && { dataFim: endDate })
            };
            saveCycleToStorage(updatedCycle);
            return updatedCycle;
        });
    };

    const resetCycleToDefault = () => {
        try {
            localStorage.removeItem(CYCLE_STORAGE_KEY);
            setCurrentCycle(mockCurrentCycle);
            saveCycleToStorage(mockCurrentCycle);
        } catch (error) {
            console.error('Erro ao resetar ciclo:', error);
        }
    };

    const value: CycleContextType = {
        currentCycle,
        evaluationStatus,
        isLoading,
        checkCycleStatus,
        updateAllTracksSet,
        updateCycleStatus,
        resetCycleToDefault,
    };

    return (
        <CycleContext.Provider value={value}>{children}</CycleContext.Provider>
    );
};
