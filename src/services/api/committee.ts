import api from '.';
import type { 
    CommitteeDashboardMetrics,
    CommitteeCollaboratorsSummary,
    CommitteeCollaboratorDetails,
    CommitteeEqualizationPayload,
    CommitteeEqualizationResponse,
    CommitteeEqualization,
    CommitteeEqualizationHistory,
    CommitteeAiSummary
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
    
    // ✅ NOVO: Gerar resumo da IA
    generateAiSummary: (collaboratorId: number, cycleConfigId: number) => 
        api.post<{ code: string; rating?: number; detailedAnalysis?: string; summary?: string; discrepancies?: string; error?: string }>(`/committee/equalization/${collaboratorId}/generate-ai-summary?cycleConfigId=${cycleConfigId}`),
    
    // ✅ NOVO: Exportar relatório de avaliações
    exportEvaluations: (cycleId: number) => 
        api.get(`/export/evaluations?cycleId=${cycleId}`, {
            responseType: 'blob',
        }),
    
    // ✅ NOVO: Buscar resumo da IA salvo
    getAiSummary: (collaboratorId: number, cycleConfigId: number) => 
        api.get<CommitteeAiSummary>(`/committee/equalization/${collaboratorId}/ai-summary?cycleConfigId=${cycleConfigId}`),
    
    // ✅ DEBUG: Endpoint temporário para verificar dados da equalização
    getEqualizationDebug: (collaboratorId: number, cycleConfigId: number) => 
        api.get<CommitteeEqualization>(`/committee/equalization/${collaboratorId}?cycleConfigId=${cycleConfigId}`),
}; 