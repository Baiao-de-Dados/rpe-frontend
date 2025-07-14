import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCycleEvaluateMutation, useCollaboratorEvaluationQuery } from './api/useCollaboratorQuery';
import { useToast } from './useToast';
import { useCycle } from './useCycle';
import type { CollaboratorEvaluatePayload } from '../types/evaluations';

export interface EvaluationSubmissionResult {
    success: boolean;
    message?: string;
}

export const useEvaluationSubmit = () => {
    
    const { showToast } = useToast();
    const { currentCycle } = useCycle();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const cycleEvaluateMutation = useCycleEvaluateMutation();
    const evaluationQuery = useCollaboratorEvaluationQuery(currentCycle?.id, { enabled: !!currentCycle?.id });
    const queryClient = useQueryClient();
    
    const submitEvaluation = async (payload: CollaboratorEvaluatePayload): Promise<boolean> => {
        if (!currentCycle) {
            showToast(
                'Nenhum ciclo ativo encontrado. Não é possível enviar a avaliação.',
                'error',
                {
                    title: 'Erro de Ciclo',
                    duration: 5000,
                }
            );
            return false;
        }

        if (evaluationQuery.data) {
            showToast(
                'Esta avaliação já foi enviada anteriormente.',
                'warning',
                {
                    title: 'Avaliação já Enviada',
                    duration: 5000,
                }
            );
            return false;
        }

        if (!payload) {
            showToast(
                'Dados da avaliação não encontrados. Tente novamente.',
                'error',
                {
                    title: 'Erro de Dados',
                    duration: 5000,
                }
            );
            return false;
        }

        setIsSubmitting(true);

        try {
            await cycleEvaluateMutation.mutateAsync(payload);
            queryClient.invalidateQueries({ queryKey: ['collaborator', 'evaluation', currentCycle.id!] });
            showToast(
                'Sua avaliação foi enviada com sucesso! Você será notificado em breve quando o processo estiver concluído.',
                'success',
                {
                    title: 'Avaliação Enviada! 🎉',
                    duration: 10000,
                },
            );
            return true;
        } catch (error) {
            console.error('Erro no envio:', error);
            showToast(
                'Ocorreu um erro técnico durante o envio. Nossa equipe foi notificada. Tente novamente em alguns minutos.',
                'error',
                {
                    title: 'Erro Técnico',
                    duration: 10000,
                },
            );
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        submitEvaluation,
        isSubmitting,
    };
};
