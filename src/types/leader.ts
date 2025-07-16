export interface LeaderEvaluationPayload {
    cycleId: number;
    collaboratorId: number;
    leaderId: number;
    generalRating: number;
    generalJustification: string;
    strengths?: string;
    improvements?: string;
}

export interface GetLeaderEvaluationPayload {
    cycleId: number;
    collaboratorId: number;
    leaderId: number;
}

export interface LeaderEvaluation {
    score: number;
    justification: string;
    strengths?: string;
    improvements?: string;
    aiSummary?: string;
}

export interface CycleLeaderAvg {
    cycleId: number;
    cycleName: string;
    averageEqualizationScore: number
}