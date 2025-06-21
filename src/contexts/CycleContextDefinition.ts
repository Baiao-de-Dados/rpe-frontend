import { createContext } from 'react';

export interface Cycle {
    id: string;
    nome: string;
    isOpen: boolean;
    dataInicio: string;
    dataFim: string;
}

export interface EvaluationStatus {
    cycleId: string;
    isSubmitted: boolean;
    submittedAt?: string;
}

export interface CycleContextType {
    currentCycle: Cycle | null;
    evaluationStatus: EvaluationStatus | null;
    isLoading: boolean;
    checkCycleStatus: () => Promise<void>;
    submitEvaluation: () => Promise<boolean>;
}

export const CycleContext = createContext<CycleContextType | undefined>(
    undefined,
);
