import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pillarEndpoints } from '../services/api/pillar';
import type { Pillar } from '../types/pillar';

export const PILLARS_QUERY_KEY = ['pillars'];

export function usePillarsQuery() {
    return useQuery<Pillar[]>({
        queryKey: PILLARS_QUERY_KEY,
        queryFn: async () => {
            const res = await pillarEndpoints.getPillars();
            return res.data;
        },
        staleTime: 30 * 1000,
    });
}

interface UsePillarMutationsOptions {
    onUpdateSuccess?: () => void;
    onUpdateError?: () => void;
    onCreateSuccess?: () => void;
    onCreateError?: () => void;
}

export const useUpdateCriteriasMutation = (options: UsePillarMutationsOptions = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: pillarEndpoints.updateCriterias,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PILLARS_QUERY_KEY });
            options.onUpdateSuccess?.();
        },
        onError: () => {
            options.onUpdateError?.();
        },
    });
};

export const useCreateCriteriaMutation = (options: UsePillarMutationsOptions = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: pillarEndpoints.createCriteria,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PILLARS_QUERY_KEY });
            options.onCreateSuccess?.();
        },
        onError: () => {
            options.onCreateError?.();
        },
    });
};
