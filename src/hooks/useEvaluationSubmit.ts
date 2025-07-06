import { useState } from 'react';
import { useToast } from './useToast';
import { useCycle } from './useCycle';

export interface EvaluationSubmissionResult {
    success: boolean;
    message?: string;
}

export const useEvaluationSubmit = () => {

    const { showToast } = useToast();
    const { currentCycle, evaluationStatus, checkCycleStatus } = useCycle();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitEvaluation = async (): Promise<boolean> => {
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

        if (evaluationStatus?.isSubmitted) {
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

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const success = Math.random() > 0.1;

            if (success) {
                const newStatus = {
                    cycleId: currentCycle.id,
                    isSubmitted: true,
                    submittedAt: new Date().toISOString(),
                };

                localStorage.setItem(
                    `evaluation_${currentCycle.id}`,
                    JSON.stringify(newStatus),
                );

                await checkCycleStatus();

                showToast(
                    'Sua avaliação foi enviada com sucesso! Você será notificado em breve quando o processo estiver concluído.',
                    'success',
                    {
                        title: 'Avaliação Enviada! 🎉',
                        duration: 10000,
                    },
                );
                return true;
            } else {
                showToast(
                    'Não foi possível enviar sua avaliação no momento. Verifique sua conexão com a internet e tente novamente.',
                    'error',
                    {
                        title: 'Falha no Envio',
                        duration: 8000,
                    },
                );
                return false;
            }
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
