import { useMemo, type ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { cycleEndpoints } from '../services/api/cycle';

import { formatDate } from '../utils/globalUtils';
import { getCurrentCycleName } from '../utils/cycleUtils';

import { useToast } from '../hooks/useToast';
import { useTracksCriteriaQuery } from '../hooks/api/useTracksCriteriaQuery';

import { CycleContext, type CycleContextType  } from './CycleContextDefinition';

import type { StartCyclePayload, ExtendCyclePayload, CurrentCycle } from '../types/cycle';

export const CycleProvider = ({ children }: { children: ReactNode }) => {

    const { showToast } = useToast();

    const queryClient = useQueryClient();


    const { data: allCycles = [], isLoading, refetch: refetchCycleData } = useQuery({
        queryKey: ['cycles'],
        queryFn: () => cycleEndpoints.getCycles().then(response => response.data),
        staleTime: 5 * 60 * 1000, 
        refetchOnWindowFocus: false,
    });

    const cycles = useMemo(() => allCycles.filter(cycle => cycle.startDate && cycle.endDate), [allCycles]);

    const { data: tracksCriteria } = useTracksCriteriaQuery();

    const allTracksSet = useMemo(() => {
        if (!tracksCriteria || !tracksCriteria.length) {
            return false;
        }
        
        return tracksCriteria.every(track => 
            track.pillars && track.pillars.length > 0 && 
            track.pillars.every(pillar => 
                pillar.criteria && pillar.criteria.length > 0
            )
        );
    }, [tracksCriteria]);

    const currentCycle: CurrentCycle = useMemo(() => {
        const currentCycleName = getCurrentCycleName();
        if (isLoading) {
            return undefined as unknown as CurrentCycle;
        }

        const foundCurrentCycle = cycles.find(cycle => cycle.name === currentCycleName);
        if (foundCurrentCycle) {
            foundCurrentCycle.isActive = false;
            return foundCurrentCycle;
        }

        return {
            name: currentCycleName,
            isActive: false,
            done: false
        };
    }, [cycles, isLoading]);

    const startCycleMutation = useMutation({
        mutationFn: (payload: StartCyclePayload) => cycleEndpoints.startCycle(payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['cycles'] });
            showToast(`O ciclo foi configurado com sucesso! Inicia: ${formatDate(variables.startDate)} - Termina: ${formatDate(variables.endDate)}`, 'success', { 
                title: 'Ciclo configurado', duration: 5000 
            });
        },
        onError: () => {
            showToast('Erro ao configurar o ciclo. Tente novamente mais tarde!', 'error', {
                title: 'Erro',
                duration: 10000
            });
        },
    });

    const extendCycleMutation = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: ExtendCyclePayload }) => cycleEndpoints.extendCycle(id, payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['cycles'] });
            showToast(`Ciclo prorrogado para ${formatDate(variables.payload.endDate)}`, 'success', {
                title: 'Ciclo prorrogado',
                duration: 5000,
            });
        },
        onError: () => {
            showToast('Erro ao prorrogar o ciclo. Tente novamente mais tarde!', 'error', {
                title: 'Erro',
                duration: 10000
            });
        },
    });

    const cancelCycleMutation = useMutation({
        mutationFn: (id: number) => cycleEndpoints.cancelCycle(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cycles'] });
            showToast('Ciclo cancelado com sucesso! As avaliações foram apagadas.', 'success', { 
                title: 'Ciclo cancelado', duration: 5000 
            });
        },
        onError: () => {
            showToast('Erro ao cancelar o ciclo. Tente novamente mais tarde!', 'error', {
                title: 'Erro',
                duration: 10000
            });
        },
    });

    const value: CycleContextType = {
        cycles,
        currentCycle,
        allTracksSet,
        isLoading,
        refetchCycleData,
        startCycle: (payload: StartCyclePayload) => startCycleMutation.mutate(payload),
        extendCycle: (id: number, payload: ExtendCyclePayload) => extendCycleMutation.mutate({ id, payload }),
        cancelCycle: (id: number) => cancelCycleMutation.mutate(id),
        isStarting: startCycleMutation.isPending,
        isExtending: extendCycleMutation.isPending,
        isCanceling: cancelCycleMutation.isPending,
    };

    return (
        <CycleContext.Provider value={value}>{children}</CycleContext.Provider>
    );

};
