import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useRef } from 'react';
import type { 
    CommitteeDashboardMetrics,
    CommitteeCollaboratorsSummary,
    CommitteeCollaboratorDetails,
    CommitteeEqualizationPayload,
    CommitteeEqualization,
    CommitteeEqualizationHistory,
    CommitteeAiSummary
} from '../../types/committee';
import { committeeEndpoints } from '../../services/api/committee';
import { useToast } from '../useToast';

export function useCommitteeDashboardMetrics() {
    return useQuery<CommitteeDashboardMetrics>({
        queryKey: ['committee-dashboard-metrics'],
        queryFn: async () => {
            const res = await committeeEndpoints.getDashboardMetrics();
            return res.data;
        },
        staleTime: 30 * 1000,
    });
}

export function useCommitteeCollaboratorsSummary() {
    return useQuery<CommitteeCollaboratorsSummary[]>({
        queryKey: ['committee-collaborators-summary'],
        queryFn: async () => {
            const res = await committeeEndpoints.getCollaboratorsSummary();
            return res.data;
        },
        staleTime: 30 * 1000,
        retry: 1,
        retryDelay: 1000,
    });
}

export function useCommitteeCollaboratorDetails(collaboratorId: number, cycleConfigId: number) {
    return useQuery<CommitteeCollaboratorDetails>({
        queryKey: ['committee-collaborator-details', collaboratorId, cycleConfigId],
        queryFn: async () => {
            const res = await committeeEndpoints.getCollaboratorDetails(collaboratorId, cycleConfigId);
            return res.data;
        },
        staleTime: 30 * 1000,
        enabled: !!collaboratorId && !!cycleConfigId,
    });
}

export function useCommitteeEqualization(collaboratorId: number, cycleConfigId: number) {
    return useQuery<CommitteeEqualization>({
        queryKey: ['committee-equalization', collaboratorId, cycleConfigId],
        queryFn: async () => {
            const res = await committeeEndpoints.getEqualization(collaboratorId, cycleConfigId);
            return res.data;
        },
        staleTime: 30 * 1000,
        enabled: !!collaboratorId && !!cycleConfigId,
    });
}

export function useCommitteeEqualizationHistory(collaboratorId: number, cycleConfigId: number) {
    return useQuery<CommitteeEqualizationHistory[]>({
        queryKey: ['committee-equalization-history', collaboratorId, cycleConfigId],
        queryFn: async () => {
            const res = await committeeEndpoints.getEqualizationHistory(collaboratorId, cycleConfigId);
            return res.data;
        },
        staleTime: 30 * 1000,
        enabled: !!collaboratorId && !!cycleConfigId,
    });
}

// ✅ NOVO: Hook para buscar resumo da IA
export function useCommitteeAiSummary(collaboratorId: number, cycleConfigId: number) {
    return useQuery<CommitteeAiSummary>({
        queryKey: ['committee-ai-summary', collaboratorId, cycleConfigId],
        queryFn: async () => {
            const res = await committeeEndpoints.getAiSummary(collaboratorId, cycleConfigId);
            return res.data;
        },
        staleTime: 30 * 1000,
        enabled: !!collaboratorId && !!cycleConfigId,
    });
}

export function useCommitteeSaveEqualization() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: CommitteeEqualizationPayload) => {
            const response = await committeeEndpoints.saveEqualization(payload);
            return response;
        },
        onSuccess: () => {
            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: ['committee-collaborators-summary'] });
            queryClient.invalidateQueries({ queryKey: ['committee-collaborator-details'] });
            queryClient.invalidateQueries({ queryKey: ['committee-equalization'] });
            queryClient.invalidateQueries({ queryKey: ['committee-equalization-history'] });
            queryClient.invalidateQueries({ queryKey: ['committee-dashboard-metrics'] });
        },
    });
}

export function useCommitteeGenerateAiSummary() {
    const queryClient = useQueryClient();
    const { showToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState(0);
    const [error, setError] = useState('');
    const [stepErrors, setStepErrors] = useState([false, false, false]);
    const abortControllerRef = useRef<AbortController | null>(null);

    const mutation = useMutation({
        mutationFn: async ({ collaboratorId, cycleConfigId }: { collaboratorId: number; cycleConfigId: number }) => {
            const response = await committeeEndpoints.generateAiSummary(collaboratorId, cycleConfigId);
            return response;
        },
        onSuccess: (data) => {
            // Invalidate related queries to refresh the data
            queryClient.invalidateQueries({ queryKey: ['committee-collaborator-details'] });
            queryClient.invalidateQueries({ queryKey: ['committee-ai-summary'] });
            // ✅ CORREÇÃO: Não invalidar equalization pois é independente
            
            if (data.data?.code === 'SUCCESS') {
                showToast('Resumo da IA gerado com sucesso!', 'success');
            }
        },
        onError: (error: unknown) => {
            setError(error instanceof Error ? error.message : 'Erro ao gerar resumo da IA');
            showToast('Erro ao gerar resumo da IA', 'error');
        },
    });

    const handleGenerateSummary = async (collaboratorId: number, cycleConfigId: number) => {
        setModalStep(0);
        setError('');
        setStepErrors([false, false, false]);
        setIsModalOpen(true);
        abortControllerRef.current = new AbortController();

        try {
            // Step 1: Analisando avaliações
            setModalStep(1);
            await new Promise(r => setTimeout(r, 2000));
            if (abortControllerRef.current.signal.aborted) return;

            // Step 2: Gerando resumo
            setModalStep(2);
            await new Promise(r => setTimeout(r, 2000));
            if (abortControllerRef.current.signal.aborted) return;

            // Step 3: Resumo gerado
            setModalStep(3);
            await new Promise(r => setTimeout(r, 1000));
            if (abortControllerRef.current.signal.aborted) return;

            // Execute the actual API call
            const response = await mutation.mutateAsync({ collaboratorId, cycleConfigId });
            
            // ✅ DEBUG: Log da resposta da IA
            console.log('🎯 AI Summary Response:', response.data);
            
            // ✅ DEBUG: Verificar se o aiSummary foi salvo
            setTimeout(async () => {
                try {
                    const debugResponse = await committeeEndpoints.getEqualizationDebug(collaboratorId, cycleConfigId);
                    console.log('🎯 Debug Equalization Data:', debugResponse.data);
                } catch (error) {
                    console.error('🎯 Debug Error:', error);
                }
            }, 2000);

        } catch {
            if (abortControllerRef.current.signal.aborted) return;
            
            // Set error based on step
            if (modalStep <= 1) {
                setStepErrors([true, false, false]);
            } else if (modalStep <= 2) {
                setStepErrors([false, true, false]);
            } else {
                setStepErrors([false, false, true]);
            }
        } finally {
            abortControllerRef.current = null;
        }
    };

    const handleModalCancel = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        setIsModalOpen(false);
        setModalStep(0);
        setError('');
        setStepErrors([false, false, false]);
    };

    const handleModalContinue = () => {
        setIsModalOpen(false);
        setModalStep(0);
        setError('');
        setStepErrors([false, false, false]);
    };

    const steps = [
        {
            label: 'Analisando avaliações',
            completed: modalStep > 0,
            error: stepErrors[0],
        },
        {
            label: 'Gerando resumo',
            completed: modalStep > 1,
            error: stepErrors[1],
        },
        {
            label: 'Resumo gerado',
            completed: modalStep > 2,
            error: stepErrors[2],
        },
    ];

    const canContinue = modalStep === 3 && !stepErrors.some(e => e) && !error;

    return {
        generateSummary: handleGenerateSummary,
        isModalOpen,
        modalStep,
        error,
        steps,
        canContinue,
        handleModalCancel,
        handleModalContinue,
        isGenerating: mutation.isPending,
    };
} 