import { useQuery } from '@tanstack/react-query';
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
