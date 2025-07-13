import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { trackEndpoints } from '../../services/api/track';
import type { GetTracksCriteriaResponse, SetTracksPayload, Track } from '../../types/track';

export const TRACKS_CRITERIA_QUERY_KEY = ['tracks', 'criteria'];
export const TRACKS_QUERY_KEY = ['tracks'];

export function useTracksQuery() {
    return useQuery<Track[]>({
        queryKey: TRACKS_QUERY_KEY,
        queryFn: async () => {
            const res = await trackEndpoints.getTracks();
            return res.data;
        },
        staleTime: 30 * 1000,
    });
}

export function useTracksCriteriaQuery() {
    return useQuery<GetTracksCriteriaResponse>({
        queryKey: TRACKS_CRITERIA_QUERY_KEY,
        queryFn: async () => {
            const res = await trackEndpoints.getTracksCriteria();
            return res.data;
        },
        staleTime: 30 * 1000,
    });
}

interface UseSetTracksMutationOptions {
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
}

export function useSetTracksMutation(options?: UseSetTracksMutationOptions) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: SetTracksPayload) => {
            return await trackEndpoints.setTracks(payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: TRACKS_CRITERIA_QUERY_KEY,
            });
            options?.onSuccess?.();
        },
        onError: error => {
            options?.onError?.(error);
        },
    });
}
