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
            const res = await committeeEndpoints.getDashboardMetrics();
            return res.data;
        },
        staleTime: 30 * 1000,
    });
}

export function useCommitteeCollaboratorsSummary() {
    return useQuery<CommitteeCollaboratorsSummary[]>({
        queryKey: ['committee-collaborators-summary'],
        queryFn: async () => {
            const res = await committeeEndpoints.getCollaboratorsSummary();
            return res.data;
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
            const res = await committeeEndpoints.getCollaboratorDetails(collaboratorId, cycleConfigId);
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
            const res = await committeeEndpoints.getEqualization(collaboratorId, cycleConfigId);
            return res.data;
        },
        staleTime: 30 * 1000,
        enabled: !!collaboratorId && !!cycleConfigId,
    });
}

export function useCommitteeEqualizationHistory(collaboratorId: number, cycleConfigId: number) {
    return useQuery<CommitteeEqualizationHistory[]>({
        queryKey: ['committee-equalization-history', collaboratorId, cycleConfigId],
        queryFn: async () => {
            const res = await committeeEndpoints.getEqualizationHistory(collaboratorId, cycleConfigId);
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
            const response = await committeeEndpoints.saveEqualization(payload);
            return response;
        },
        onSuccess: () => {
            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: ['committee-collaborators-summary'] });
            queryClient.invalidateQueries({ queryKey: ['committee-collaborator-details'] });
            queryClient.invalidateQueries({ queryKey: ['committee-equalization'] });
            queryClient.invalidateQueries({ queryKey: ['committee-equalization-history'] });
            queryClient.invalidateQueries({ queryKey: ['committee-dashboard-metrics'] });
        },
    });
} 