import api from '.';

import type { AssignLeaderEvaluationPayload, LeadersAndCollaborators } from '../../types/manager';

export const managerEndpoints = {
    getLeadersAndCollaborators: () =>
        api.get<LeadersAndCollaborators>(`/manager/leaders-and-collaborators`),
    assignLeaderEvaluation: (payload: AssignLeaderEvaluationPayload) =>
        api.post(`/manager/assign-leader-evaluation`, payload),
};
