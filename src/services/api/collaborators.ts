import api from '.';

import type { Track } from '../../types/track';

import type { Network } from '../../types/collaborator';

import type { CollaboratorEvaluatePayload, CollaboratorEvaluation } from '../../types/evaluations';

export const collaboratorsEndpoints = {
    getCriteria: (trackId: number) => 
        api.get<Track>(`/rh/criteria/track-config/filter/${trackId}`),
    getNetwork: () =>
        api.get<Network>('/employer/network'),
    evaluate: (payload: CollaboratorEvaluatePayload) =>
        api.post('/evaluations', payload),
    getEvaluation: (cycleConfigId: number) =>
        api.get<CollaboratorEvaluation>('/employer/evaluation-result/', { params: { cycleConfigId } }),
};
