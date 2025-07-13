import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { AssignLeaderEvaluationPayload, LeadersAndCollaborators } from '../types/manager';
import { managerEndpoints } from '../services/api/manager';


export function useLeadersAndCollaborators() {
    return useQuery<LeadersAndCollaborators>({
        queryKey: ['leaders-and-collaborators'],
        queryFn: async () => {
            const res = await managerEndpoints.getLeadersAndCollaborators();
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
