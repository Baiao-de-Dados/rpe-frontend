import { createContext } from 'react';
import type { Cycles, StartCyclePayload, ExtendCyclePayload, CurrentCycle, EvaluationStatus } from '../types/cycle';

export interface CycleContextType {
    cycles: Cycles;
    currentCycle: CurrentCycle;
    allTracksSet: boolean;
    isLoading: boolean;
    evaluationStatus: EvaluationStatus | null;
    refetchCycleData: () => void;
    refetchEvaluationStatus: () => void;
    startCycle: (payload: StartCyclePayload) => void;
    extendCycle: (id: number, payload: ExtendCyclePayload) => void;
    cancelCycle: (id: number) => void;
    isStarting: boolean;
    isExtending: boolean;
    isCanceling: boolean;
}

export const CycleContext = createContext<CycleContextType | undefined>(
    undefined,
);
