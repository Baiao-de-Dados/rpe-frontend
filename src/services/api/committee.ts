import api from '.';
import type { 
    CommitteeDashboardMetrics,
    CommitteeCollaboratorsSummary,
    CommitteeCollaboratorDetails,
    CommitteeEqualizationPayload,
    CommitteeEqualizationResponse,
    CommitteeEqualization,
    CommitteeEqualizationHistory
} from '../../types/committee';

export const committeeEndpoints = {
    // Dashboard endpoints
    getDashboardMetrics: () => api.get<CommitteeDashboardMetrics>('/committee/dashboard/metrics'),
    getCollaboratorsSummary: () => api.get<CommitteeCollaboratorsSummary[]>('/committee/dashboard/collaborators-summary'),
    
    // Collaborator details
    getCollaboratorDetails: (collaboratorId: number, cycleConfigId: number) => 
        api.get<CommitteeCollaboratorDetails>(`/committee/collaborator/${collaboratorId}/evaluation-details?cycleConfigId=${cycleConfigId}`),
    
    // Get existing equalization
    getEqualization: (collaboratorId: number, cycleConfigId: number) => 
        api.get<CommitteeEqualization>(`/committee/equalization/${collaboratorId}?cycleConfigId=${cycleConfigId}`),
    
    // ✅ NOVO: Histórico de equalização
    getEqualizationHistory: (collaboratorId: number, cycleConfigId: number) => 
        api.get<CommitteeEqualizationHistory[]>(`/committee/equalization/${collaboratorId}/history?cycleConfigId=${cycleConfigId}`),
    
    // Save equalization (agora com changeReason opcional)
    saveEqualization: (payload: CommitteeEqualizationPayload) => 
        api.post<CommitteeEqualizationResponse>('/committee/equalization', payload),
}; 