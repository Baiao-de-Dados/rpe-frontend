export interface CycleCriterion {
    id: number;
    criterionId: number;
    weight: number;
}

export interface CyclePillar {
    pillarId: number;
    criteria: CycleCriterion[];
}

export interface CycleTrack {
    trackId: number;
    pillars: CyclePillar[];
}

export interface Cycle {
    id: number;
    name: string;
    description?: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    criteriaPillars: CycleTrack[];
}

export type Cycles = Cycle[];

export interface StartCyclePayload {
    endDate: string;
}

export interface ExtendCyclePayload {
    endDate: string;
}

export type CurrentCycle = Partial<Cycle> & { name: string; isActive: boolean };

export interface EvaluationStatus {
    cycleId: number;
    isSubmitted: boolean;
    submittedAt: string;
}