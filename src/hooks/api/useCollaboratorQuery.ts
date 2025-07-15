import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { collaboratorsEndpoints } from '../../services/api/collaborators';

import type { Track } from '../../types/track';
import type { Network } from '../../types/collaborator';
import type { CollaboratorEvaluation } from '../../types/evaluations';
import type { CollaboratorEvaluatePayload } from '../../types/evaluations';

export const CYCLE_CRITERIA_QUERY_KEY = ['cycle', 'criteria'];
export const CYCLE_NETWORK_QUERY_KEY = ['cycle', 'network'];
export const CYCLE_EVALUATE_MUTATION_KEY = ['cycle', 'evaluate'];

export function useCycleCriteriaQuery(trackId?: number, options?: { enabled?: boolean }) {
    const isValid = typeof trackId === 'number' && trackId > 0;
    return useQuery<Track>({
        queryKey: [...CYCLE_CRITERIA_QUERY_KEY, trackId ?? 'none'],
        queryFn: async () => {
            if (!isValid) return undefined as unknown as Track;
            const res = await collaboratorsEndpoints.getCriteria(trackId!);
            return res.data;
        },
        enabled: options?.enabled ?? isValid,
        staleTime: 30 * 1000,
    });
}

export function useCycleNetworkQuery() {
    return useQuery<Network>({
        queryKey: CYCLE_NETWORK_QUERY_KEY,
        queryFn: async () => {
            const res = await collaboratorsEndpoints.getNetwork();
            return res.data;
        },
        staleTime: 30 * 1000,
    });
}

export function useCycleEvaluateMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: CYCLE_EVALUATE_MUTATION_KEY,
        mutationFn: async (payload: CollaboratorEvaluatePayload) => {
            const res = await collaboratorsEndpoints.evaluate(payload);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CYCLE_CRITERIA_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: CYCLE_NETWORK_QUERY_KEY });
        },
    });
}

export function useCollaboratorEvaluationQuery(cycleConfigId?: number, options?: { enabled?: boolean }) {
    const isValid = typeof cycleConfigId === 'number' && cycleConfigId > 0;
    return useQuery<CollaboratorEvaluation>({
        queryKey: ['collaborator', 'evaluation', cycleConfigId ?? 'none'],
        queryFn: async () => {
            if (!isValid) return undefined as unknown as CollaboratorEvaluation;
            const res = await collaboratorsEndpoints.getEvaluation(cycleConfigId!);
            return res.data;
        },
        enabled: options?.enabled ?? isValid,
        staleTime: 30 * 1000,
    });
}