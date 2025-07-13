import api from '.';

import type { CollaboratorsEvaluationsSummary } from '../../types/collaborator';

import type { GetLeaderEvaluationPayload, LeaderEvaluation, LeaderEvaluationPayload } from '../../types/leader';

export const leaderEndpoints = {
    getLeaderCollaboratorsEvaluation: () =>
        api.get<CollaboratorsEvaluationsSummary>(`/leader/collaborators/evaluations-summary`),
    getLeaderEvaluation: (payload: GetLeaderEvaluationPayload) =>
        api.get<LeaderEvaluation>(`/leader/evaluation`, { params: payload }),
    leaderEvaluation: (payload: LeaderEvaluationPayload) =>
        api.post(`/leader/evaluate`, payload),
};
