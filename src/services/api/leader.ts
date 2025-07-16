import api from '.';

import type { CollaboratorsEvaluationsSummary } from '../../types/collaborator';

import type { CycleLeaderAvg, GetLeaderEvaluationPayload, LeaderEvaluation, LeaderEvaluationPayload } from '../../types/leader';

export const leaderEndpoints = {
    getLeaderCollaboratorsEvaluation: () =>
        api.get<CollaboratorsEvaluationsSummary>(`/leader/collaborators/evaluations-summary`),
    getLeaderEvaluation: (payload: GetLeaderEvaluationPayload) =>
        api.get<LeaderEvaluation>(`/leader/evaluation`, { params: payload }),
    getAllCycleAvg: () =>
        api.get<CycleLeaderAvg[]>(`/leader/average-equalization-by-cycle`),
    leaderEvaluation: (payload: LeaderEvaluationPayload) =>
        api.post(`/leader/evaluate`, payload),
};
