 import api from '.';

import type { 
    AssignLeaderEvaluationPayload, 
    LeadersAndCollaborators,
    CollaboratorEvaluationSummary,
    CollaboratorEvaluationResult
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
        api.get<CollaboratorEvaluationResult>(`/manager/collaborator-evaluation-result?collaboratorId=${collaboratorId}&cycleConfigId=${cycleConfigId}`),
    
    // Auto evaluation
    getUserAutoEvaluation: (userId: number) => api.get(`/manager/auto-evaluation/${userId}`),
    
    // Manager evaluation
    evaluateCollaborator: (payload: {
        cycleConfigId: number;
        managerId: number;
        colaboradorId: number;
        autoavaliacao: {
            pilares: {
                pilarId: number;
                criterios: {
                    criterioId: number;
                    nota: number;
                    justificativa: string;
                }[];
            }[];
        };
    }) => api.post('/manager/evaluate', payload),
    
    // Get manager evaluation for a specific collaborator
    getManagerEvaluation: (collaboratorId: number, cycleConfigId: number) => {
        console.log('Calling getManagerEvaluation endpoint:', { collaboratorId, cycleConfigId });
        return api.get(`/manager/evaluation/${collaboratorId}?cycleConfigId=${cycleConfigId}`);
    },
    
    // Collaborator evaluations (rotas existentes do employer)
    getCollaboratorEvaluationResult: (cycleId: number, collaboratorId: number) => 
        api.get(`/employer/evaluation-result?cycleConfigId=${cycleId}&userId=${collaboratorId}`),
    
    getCollaboratorAllEvaluations: (collaboratorId: number) => 
        api.get(`/employer/all-evaluations?userId=${collaboratorId}`),
};
