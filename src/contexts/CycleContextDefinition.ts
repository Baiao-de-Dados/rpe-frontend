import { createContext } from 'react';
import type { Cycles, StartCyclePayload, ExtendCyclePayload, CurrentCycle } from '../types/cycle';

export interface CycleContextType {
    cycles: Cycles;
    currentCycle: CurrentCycle;
    allTracksSet: boolean;
    isLoading: boolean;
    refetchCycleData: () => void;
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
