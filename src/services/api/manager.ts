 import api from '.';

import type { 
    AssignLeaderEvaluationPayload, 
    LeadersAndCollaborators,
    CollaboratorEvaluationSummary,
    CollaboratorEvaluationDetails
} from '../../types/manager';

export const managerEndpoints = {
    getLeadersAndCollaborators: () =>
        api.get<LeadersAndCollaborators>(`/manager/leaders-and-collaborators`),
    assignLeaderEvaluation: (payload: AssignLeaderEvaluationPayload) =>
        api.post(`/manager/assign-leader-evaluation`, payload),
    
    // Dashboard endpoints
    getTotalLeaders: () => api.get('/manager/dashboard/total-leaders'),
    getEvaluationPercentage: () => api.get('/manager/dashboard/evaluation-percentage'),
    getMissingEvaluations: () => api.get('/manager/dashboard/missing-evaluations'),
    getLeaderEvaluationPercentage: () => api.get('/manager/dashboard/leaders/evaluation-percentage'),
    getCollaboratorsWithoutLeader: () => api.get('/manager/dashboard/collaborators/without-leader'),
    
    // Collaborators evaluations
    getCollaboratorsEvaluationsSummary: () => api.get<CollaboratorEvaluationSummary[]>('/manager/all-collaborators-evaluations'),
    getCollaboratorEvaluationDetails: (collaboratorId: number, cycleConfigId: number) => 
        api.get<CollaboratorEvaluationDetails>(`/manager/collaborator-evaluation-result?collaboratorId=${collaboratorId}&cycleConfigId=${cycleConfigId}`),
    
    // Auto evaluation
    getUserAutoEvaluation: (userId: number) => api.get(`/manager/auto-evaluation/${userId}`),
    
    // Manager evaluation
    evaluateCollaborator: (payload: {
        managerId: number;
        collaboratorId: number;
        cycleId: number;
        trackId: number;
        criteria: Array<{
            criterionId: number;
            score: number;
        }>;
    }) => api.post('/manager/evaluate', payload),
    
    // Collaborator evaluations (rotas existentes do employer)
    getCollaboratorEvaluationResult: (cycleId: number, collaboratorId: number) => 
        api.get(`/employer/evaluation-result?cycleConfigId=${cycleId}&userId=${collaboratorId}`),
    
    getCollaboratorAllEvaluations: (collaboratorId: number) => 
        api.get(`/employer/all-evaluations?userId=${collaboratorId}`),
};
