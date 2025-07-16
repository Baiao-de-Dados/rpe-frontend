import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { 
    CommitteeDashboardMetrics,
    CommitteeCollaboratorsSummary,
    CommitteeCollaboratorDetails,
    CommitteeEqualizationPayload,
    CommitteeEqualization,
    CommitteeEqualizationHistory
} from '../../types/committee';
import { committeeEndpoints } from '../../services/api/committee';

export function useCommitteeDashboardMetrics() {
    return useQuery<CommitteeDashboardMetrics>({
        queryKey: ['committee-dashboard-metrics'],
        queryFn: async () => {
            console.log('Fetching committee dashboard metrics...');
            const res = await committeeEndpoints.getDashboardMetrics();
            console.log('Committee dashboard metrics response:', res.data);
            return res.data;
        },
        staleTime: 30 * 1000,
    });
}

export function useCommitteeCollaboratorsSummary() {
    return useQuery<CommitteeCollaboratorsSummary[]>({
        queryKey: ['committee-collaborators-summary'],
        queryFn: async () => {
            console.log('Fetching committee collaborators summary...');
            try {
                const res = await committeeEndpoints.getCollaboratorsSummary();
                console.log('Committee collaborators summary response:', res.data);
                return res.data;
            } catch (error) {
                console.error('Error fetching committee collaborators summary:', error);
                throw error;
            }
        },
        staleTime: 30 * 1000,
        retry: 1,
        retryDelay: 1000,
    });
}

export function useCommitteeCollaboratorDetails(collaboratorId: number, cycleConfigId: number) {
    return useQuery<CommitteeCollaboratorDetails>({
        queryKey: ['committee-collaborator-details', collaboratorId, cycleConfigId],
        queryFn: async () => {
            console.log('Fetching committee collaborator details:', { collaboratorId, cycleConfigId });
            const res = await committeeEndpoints.getCollaboratorDetails(collaboratorId, cycleConfigId);
            console.log('Committee collaborator details response:', res.data);
            return res.data;
        },
        staleTime: 30 * 1000,
        enabled: !!collaboratorId && !!cycleConfigId,
    });
}

export function useCommitteeEqualization(collaboratorId: number, cycleConfigId: number) {
    return useQuery<CommitteeEqualization>({
        queryKey: ['committee-equalization', collaboratorId, cycleConfigId],
        queryFn: async () => {
            console.log('🔍 Hook: Buscando equalização existente');
            console.log('🔍 Hook: Parâmetros:', { collaboratorId, cycleConfigId });
            console.log('🔍 Hook: URL esperada: GET /committee/equalization/' + collaboratorId + '?cycleConfigId=' + cycleConfigId);
            
            try {
                const res = await committeeEndpoints.getEqualization(collaboratorId, cycleConfigId);
                console.log('🔍 Hook: Resposta da API (GET equalization):', res.data);
                return res.data;
            } catch (error: unknown) {
                console.error('🔍 Hook: Erro ao buscar equalização:', error);
                console.error('🔍 Hook: Detalhes do erro:', {
                    message: (error as Error)?.message,
                    status: (error as { response?: { status?: number } })?.response?.status,
                    data: (error as { response?: { data?: unknown } })?.response?.data,
                    url: (error as { config?: { url?: string } })?.config?.url,
                    method: (error as { config?: { method?: string } })?.config?.method
                });
                throw error;
            }
        },
        staleTime: 30 * 1000,
        enabled: !!collaboratorId && !!cycleConfigId,
    });
}

// ✅ NOVO: Hook para histórico de equalização
export function useCommitteeEqualizationHistory(collaboratorId: number, cycleConfigId: number) {
    return useQuery<CommitteeEqualizationHistory[]>({
        queryKey: ['committee-equalization-history', collaboratorId, cycleConfigId],
        queryFn: async () => {
            console.log('Fetching committee equalization history:', { collaboratorId, cycleConfigId });
            const res = await committeeEndpoints.getEqualizationHistory(collaboratorId, cycleConfigId);
            console.log('Committee equalization history response:', res.data);
            return res.data;
        },
        staleTime: 30 * 1000,
        enabled: !!collaboratorId && !!cycleConfigId,
    });
}

export function useCommitteeSaveEqualization() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: CommitteeEqualizationPayload) => {
            console.log('🔧 Hook: Iniciando mutation para salvar equalização');
            console.log('🔧 Hook: Payload recebido:', payload);
            console.log('🔧 Hook: URL esperada: POST /committee/equalization');
            
            try {
                const response = await committeeEndpoints.saveEqualization(payload);
                console.log('🔧 Hook: Resposta da API:', response);
                return response;
            } catch (error: unknown) {
                console.error('🔧 Hook: Erro na mutation:', error);
                console.error('🔧 Hook: Detalhes do erro:', {
                    message: (error as Error)?.message,
                    status: (error as { response?: { status?: number } })?.response?.status,
                    data: (error as { response?: { data?: unknown } })?.response?.data,
                    url: (error as { config?: { url?: string } })?.config?.url,
                    method: (error as { config?: { method?: string } })?.config?.method
                });
                throw error;
            }
        },
        onSuccess: (data) => {
            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: ['committee-collaborators-summary'] });
            queryClient.invalidateQueries({ queryKey: ['committee-collaborator-details'] });
            queryClient.invalidateQueries({ queryKey: ['committee-equalization'] });
            queryClient.invalidateQueries({ queryKey: ['committee-equalization-history'] });
            queryClient.invalidateQueries({ queryKey: ['committee-dashboard-metrics'] });
            
            console.log('Committee equalization mutation success - cache invalidated');
            
            // Se há histórico na resposta, mostrar toast informativo
            if (data.data?.history) {
                console.log('Equalization updated with history:', data.data.history);
            }
        },
    });
} 