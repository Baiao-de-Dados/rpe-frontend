import { useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '../useToast';

import { notesEndpoints } from '../../services/api/notes';

import type { Note, UpsertNotePayload } from '../../types/notes';

export const NOTE_QUERY_KEY = ['note'];

export function useNoteQuery(userId: number) {
    const { showToast } = useToast();
    const query = useQuery<Note>({
        queryKey: [...NOTE_QUERY_KEY, userId],
        queryFn: async () => {
            const res = await notesEndpoints.getNote(userId);
            return res.data;
        },
        staleTime: 30 * 1000,
        enabled: !!userId,
        retry: false,
    });

    const hasShownErrorRef = useRef(false);
    useEffect(() => {
        if (query.isError && query.error && !hasShownErrorRef.current) {
            showToast('Falha ao se comunicar com o servidor. Tente novamente mais tarde.', 'error', {
                title: 'Erro ao carregar anotações',
                duration: -1,
            });
            hasShownErrorRef.current = true;
        }
        if (!query.isError) {
            hasShownErrorRef.current = false;
        }
    }, [query.isError, query.error, showToast]);

    return query;
}

interface UseUpsertNoteMutationOptions {
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
}

export function useUpsertNoteMutation(userId: number, options?: UseUpsertNoteMutationOptions) {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    return useMutation({
        mutationFn: async (payload: UpsertNotePayload) => {
            return await notesEndpoints.upsertNote(userId, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [...NOTE_QUERY_KEY, userId],
            });
            showToast('Anotações salvas com sucesso!', 'success', { 
                duration: 3000, 
                title: 'Sucesso' 
            });
            options?.onSuccess?.();
        },
        onError: error => {
            showToast('Falha ao se comunicar com o servidor. Tente novamente mais tarde.', 'error', { 
                duration: -1, 
                title: 'Erro ao salvar anotações' 
            });
            options?.onError?.(error);
        },
    });
}
