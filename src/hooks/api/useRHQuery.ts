
import { useQuery } from '@tanstack/react-query';

import { rhEndpoints } from '../../services/api/rh';

import type { GetRHDashboard, GetRHTracks, GetRHCollaborators } from '../../types/rh';

export function useRHQueries() {
    const collaboratorsQuery = useQuery<GetRHCollaborators[]>({
        queryKey: ['rh-collaborators'],
        queryFn: async () => {
            const res = await rhEndpoints.getCycles();
            return res.data;
        },
        staleTime: 30 * 1000,
    });

    const dashboardQuery = useQuery<GetRHDashboard>({
        queryKey: ['rh-dashboard'],
        queryFn: async () => {
            const res = await rhEndpoints.getRHDashboard();
            return res.data;
        },
        staleTime: 30 * 1000,
    });

    const tracksQuery = useQuery<GetRHTracks>({
        queryKey: ['rh-tracks'],
        queryFn: async () => {
            const res = await rhEndpoints.getRHTracks();
            return res.data;
        },
        staleTime: 30 * 1000,
    });

    return {
        collaboratorsQuery,
        dashboardQuery,
        tracksQuery,
        collaborators: collaboratorsQuery.data,
        dashboard: dashboardQuery.data,
        tracks: tracksQuery.data,
        isLoading: collaboratorsQuery.isLoading || dashboardQuery.isLoading || tracksQuery.isLoading,
        isError: collaboratorsQuery.isError || dashboardQuery.isError || tracksQuery.isError,
    };
}
