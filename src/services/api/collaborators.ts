import api from '.';

import type { Track } from '../../types/track';

import type { Network } from '../../types/collaborator';

import type { CollaboratorEvaluateDraft, CollaboratorEvaluatePayload, CollaboratorEvaluation, EvaluationCyclesHistory } from '../../types/evaluations';

export const collaboratorsEndpoints = {
    getCriteria: (trackId: number) => 
        api.get<Track>(`/rh/criteria/track-config/filter/${trackId}`),
    getNetwork: () =>
        api.get<Network>('/employer/network'),
    getAllEvaluation: () =>
        api.get<EvaluationCyclesHistory>('/employer/cycles-history'),
    evaluate: (payload: CollaboratorEvaluatePayload) =>
        api.post('/evaluations', payload),
    getEvaluation: (cycleConfigId: number) =>
        api.get<CollaboratorEvaluation>('/employer/evaluation-result/', { params: { cycleConfigId } }),
    saveDraft: (payload: CollaboratorEvaluateDraft) =>
        api.post('/evaluations/draft', payload),
    getDraft: (cycleId: number) =>
        api.get<CollaboratorEvaluateDraft>('/evaluations/draft', { params: { cycleId } }),
};
