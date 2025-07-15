import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { 
    AssignLeaderEvaluationPayload, 
    LeadersAndCollaborators,
    DashboardMetrics,
    CollaboratorEvaluationSummary,
    ManagerEvaluationPayload,
    ManagerEvaluationResponse,
    UserAutoEvaluation,
    CollaboratorEvaluationResult,
    CollaboratorAllEvaluations
} from '../../types/manager';
import { managerEndpoints } from '../../services/api/manager';
import { trackEndpoints } from '../../services/api/track';
import { useMemo } from 'react';

export function useLeadersAndCollaborators() {
    return useQuery<LeadersAndCollaborators>({
        queryKey: ['leaders-and-collaborators'],
        queryFn: async () => {
            console.log('Fetching leaders and collaborators...');
            const res = await managerEndpoints.getLeadersAndCollaborators();
            console.log('Leaders and collaborators response:', res.data);
            return res.data;
        },
        staleTime: 30 * 1000,
    });
}

export function useAssignLeaderEvaluation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: AssignLeaderEvaluationPayload) =>
            managerEndpoints.assignLeaderEvaluation(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leaders-and-collaborators'] });
        },
    });
}

// Dashboard hooks
export function useTotalLeaders() {
    return useQuery<{ totalLeaders: number }>({
        queryKey: ['manager-total-leaders'],
        queryFn: async () => {
            const res = await managerEndpoints.getTotalLeaders();
            return res.data;
        },
        staleTime: 30 * 1000,
    });
}

export function useEvaluationPercentage() {
    return useQuery<DashboardMetrics>({
        queryKey: ['manager-evaluation-percentage'],
        queryFn: async () => {
            const res = await managerEndpoints.getEvaluationPercentage();
            return res.data;
        },
        staleTime: 30 * 1000,
    });
}

export function useMissingEvaluations() {
    return useQuery<{ missing: number }>({
        queryKey: ['manager-missing-evaluations'],
        queryFn: async () => {
            const res = await managerEndpoints.getMissingEvaluations();
            return res.data;
        },
        staleTime: 30 * 1000,
    });
}

export function useLeaderEvaluationPercentage() {
    return useQuery<DashboardMetrics>({
        queryKey: ['manager-leader-evaluation-percentage'],
        queryFn: async () => {
            const res = await managerEndpoints.getLeaderEvaluationPercentage();
            return res.data;
        },
        staleTime: 30 * 1000,
    });
}

export function useCollaboratorsWithoutLeader() {
    return useQuery<{ missing: number }>({
        queryKey: ['manager-collaborators-without-leader'],
        queryFn: async () => {
            const res = await managerEndpoints.getCollaboratorsWithoutLeader();
            return res.data;
        },
        staleTime: 30 * 1000,
    });
}

// Collaborators evaluations hooks
export function useCollaboratorsEvaluationsSummary() {
    return useQuery<CollaboratorEvaluationSummary[]>({
        queryKey: ['manager-collaborators-evaluations-summary'],
        queryFn: async () => {
            console.log('Calling getCollaboratorsEvaluationsSummary...');
            const res = await managerEndpoints.getCollaboratorsEvaluationsSummary();
            console.log('getCollaboratorsEvaluationsSummary response:', res.data);
            return res.data;
        },
        staleTime: 30 * 1000,
    });
}

export function useCollaboratorEvaluationDetails(collaboratorId: number, cycleConfigId: number) {
    return useQuery<CollaboratorEvaluationResult>({
        queryKey: ['manager-collaborator-evaluation-details', collaboratorId, cycleConfigId],
        queryFn: async () => {
            console.log('Fetching collaborator evaluation details:', { collaboratorId, cycleConfigId });
            const res = await managerEndpoints.getCollaboratorEvaluationDetails(collaboratorId, cycleConfigId);
            console.log('Collaborator evaluation details response:', res.data);
            return res.data;
        },
        staleTime: 30 * 1000,
        enabled: !!collaboratorId && !!cycleConfigId,
    });
}

// Auto evaluation hook
export function useUserAutoEvaluation(userId: number) {
    return useQuery<UserAutoEvaluation>({
        queryKey: ['manager-user-auto-evaluation', userId],
        queryFn: async () => {
            const res = await managerEndpoints.getUserAutoEvaluation(userId);
            return res.data;
        },
        staleTime: 30 * 1000,
        enabled: !!userId,
    });
}

// Collaborator evaluation hooks (rotas do employer)
export function useCollaboratorEvaluationResult(cycleId: number, collaboratorId: number) {
    return useQuery<CollaboratorEvaluationResult>({
        queryKey: ['collaborator-evaluation-result', cycleId, collaboratorId],
        queryFn: async () => {
            const res = await managerEndpoints.getCollaboratorEvaluationResult(cycleId, collaboratorId);
            return res.data;
        },
        staleTime: 30 * 1000,
        enabled: !!cycleId && !!collaboratorId,
    });
}

export function useCollaboratorAllEvaluations(collaboratorId: number) {
    return useQuery<CollaboratorAllEvaluations[]>({
        queryKey: ['collaborator-all-evaluations', collaboratorId],
        queryFn: async () => {
            const res = await managerEndpoints.getCollaboratorAllEvaluations(collaboratorId);
            return res.data;
        },
        staleTime: 30 * 1000,
        enabled: !!collaboratorId,
    });
}

// Track criteria hook
export function useTrackCriteria() {
    return useQuery({
        queryKey: ['track-criteria'],
        queryFn: async () => {
            const res = await trackEndpoints.getTracksCriteria();
            return res.data;
        },
        staleTime: 30 * 1000,
    });
}

// Manager evaluation query
export function useManagerEvaluationQuery(collaboratorId: number, cycleConfigId: number) {
    return useQuery<ManagerEvaluationResponse>({
        queryKey: ['manager-evaluation', collaboratorId, cycleConfigId],
        queryFn: async () => {
            console.log('Fetching manager evaluation:', { collaboratorId, cycleConfigId });
            const res = await managerEndpoints.getManagerEvaluation(collaboratorId, cycleConfigId);
            console.log('Manager evaluation response:', res.data);
            return res.data;
        },
        staleTime: 30 * 1000,
        enabled: !!collaboratorId && !!cycleConfigId,
        retry: 1, // Tentar apenas uma vez se falhar
        retryDelay: 1000, // Esperar 1 segundo antes de tentar novamente
    });
}

// Manager evaluation mutation
export function useManagerEvaluation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: ManagerEvaluationPayload) =>
            managerEndpoints.evaluateCollaborator(payload),
        onSuccess: () => {
            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: ['manager-collaborators-evaluations-summary'] });
            queryClient.invalidateQueries({ queryKey: ['manager-collaborators-evaluations-details'] });
            queryClient.invalidateQueries({ queryKey: ['manager-collaborator-evaluation-details'] });
            queryClient.invalidateQueries({ queryKey: ['collaborator-evaluation-result'] });
            queryClient.invalidateQueries({ queryKey: ['collaborator-all-evaluations'] });
            queryClient.invalidateQueries({ queryKey: ['manager-missing-evaluations'] });
            queryClient.invalidateQueries({ queryKey: ['manager-evaluation-percentage'] });
            queryClient.invalidateQueries({ queryKey: ['manager-evaluation'] });
            
            console.log('Manager evaluation mutation success - cache invalidated');
        },
    });
}

// Utility functions
export function getLeadersCount(data?: LeadersAndCollaborators): number {
    return data?.leaders?.length ?? 0;
}

export function getCollaboratorsCount(data?: LeadersAndCollaborators): number {
    return data?.collaborators?.length ?? 0;
}

export function getLeadersEvaluationCompletion(data?: LeadersAndCollaborators): number {
    if (!data?.collaborators || data.collaborators.length === 0) return 0;

    const managed = data.collaborators.filter(c => typeof c.leaderId === 'number' && c.leaderId !== null);
    if (managed.length === 0) return 0;

    const completed = managed.filter(c => typeof c.leaderRating === 'number' && c.leaderRating !== null).length;
    return Math.round((completed / managed.length) * 100);
}

export function getUnassignedCollaboratorsCount(data?: LeadersAndCollaborators): number {
    return data?.collaborators?.filter(c => !c.leaderId).length ?? 0;
}

// Hook para buscar apenas colaboradores (usando dados já separados da API)
export function useCollaboratorsOnly() {
    const { data: leadersAndCollaborators, isLoading, error } = useLeadersAndCollaborators();
    
    const collaboratorsOnly = useMemo(() => 
        leadersAndCollaborators?.collaborators || [], 
        [leadersAndCollaborators]
    );
    
    return {
        data: collaboratorsOnly,
        isLoading,
        error,
        totalCollaborators: collaboratorsOnly.length,
        totalLeaders: leadersAndCollaborators?.leaders?.length || 0
    };
}
