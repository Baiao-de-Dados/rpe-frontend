import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { useToast } from '../useToast';
import { isAxiosError } from 'axios';

import { adminEndpoints } from '../../services/api/admin';

import type { GetLogsResponse, LogsFilters, ERP } from '../../types/admin';

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

export function useERP(options?: UseQueryOptions<ERP>) {
    return useQuery<ERP>({
        queryKey: ['erp'],
        queryFn: async () => {
            const res = await adminEndpoints.getERP();
            console.log(res.data)
            return res.data;
        },
        ...(options || {}),
    });
}

export function useSynchronizeERP(options?: UseMutationOptions) {
    const queryClient = useQueryClient();
    const { showToast } = useToast();
    return useMutation({
        mutationFn: async () => {
            const res = await adminEndpoints.synchronize();
            return res.data;
        },
        onSuccess: (data, variables, context) => {
            showToast('Sincronização concluída! Os dados do ERP foram atualizados com sucesso.', 'success', { 
                title: 'Sincronização bem-sucedida', 
                duration: 5000
            });
            queryClient.invalidateQueries({ queryKey: ['erp'] });
            if (options && options.onSuccess) {
                options.onSuccess(data, variables, context);
            }
        },
        onError: (error, variables, context) => {
            let errorMsg = 'Erro ao sincronizar com o ERP. Verifique sua conexão ou tente novamente mais tarde.';
            if (isAxiosError(error)) {
                if (error.response?.data?.message) {
                    errorMsg += `\nDetalhes: ${error.response.data.message}`;
                } else if (error.message) {
                    errorMsg += `\nDetalhes: ${error.message}`;
                }
            } else if (error && typeof error === 'object' && error !== null && 'message' in error && typeof (error as { message?: unknown }).message === 'string') {
                errorMsg += `\nDetalhes: ${(error as { message: string }).message}`;
            }
            showToast(errorMsg, 'error', { 
                title: 'Falha na sincronização', 
                duration: -1
            });
            if (options && options.onError) {
                options.onError(error, variables, context);
            }
        },
        ...(options || {}),
    });
}
