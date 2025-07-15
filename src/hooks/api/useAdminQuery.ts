import { useInfiniteQuery } from '@tanstack/react-query';
import type { GetLogsResponse, LogsFilters } from '../../types/admin';
import { adminEndpoints } from '../../services/api/admin';

const PAGE_SIZE = 50;

export function useInfiniteLogs(filters?: LogsFilters) {
    return useInfiniteQuery<GetLogsResponse, Error>({
        queryKey: ['logs', filters],
        queryFn: async ({ pageParam = 1 }) => {
        const page = typeof pageParam === 'number' ? pageParam : 1;
        const res = await adminEndpoints.getLogs({
            page,
            pageSize: PAGE_SIZE,
            ...filters,
        });
        return res.data;
        },
        getNextPageParam: (lastPage, allPages) =>
        lastPage.hasNext ? allPages.length + 1 : undefined,
        initialPageParam: 1,
    });
}
