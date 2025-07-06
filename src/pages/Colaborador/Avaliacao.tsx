import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import { useCycle } from '../../hooks/useCycle';

import { fullEvaluationSchema, type EvaluationFormData } from '../../schemas/evaluation';

import CycleLoading from '../../components/common/CycleLoading';
import { EvaluationForm } from '../../components/Evaluation/EvaluationForm';
import CycleClosedMessage from '../../components/Evaluation/CycleClosedMessage';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import EvaluationSubmittedMessage from '../../components/Evaluation/EvaluationSubmittedMessage';

export function Avaliacao() {

    const location = useLocation();

    const { currentCycle, evaluationStatus, isLoading } = useCycle();

    const methods = useForm<EvaluationFormData>({
        resolver: zodResolver(fullEvaluationSchema),
        mode: 'onSubmit',
    });

    useEffect(() => {
        if (location.state) {
            const { mentoringNota, mentoringJustificativa, nota, justificativa, geminiResponse } = location.state;
            let finalNota = mentoringNota ?? nota;
            let finalJustificativa = mentoringJustificativa ?? justificativa;

            if (geminiResponse) {
                const gemini = typeof geminiResponse === 'string' ? JSON.parse(geminiResponse) : geminiResponse;
                finalNota = gemini.nota;
                finalJustificativa = gemini.justificativa;
            }
            if (finalNota) {
                methods.setValue('mentoringRating', finalNota);
            }
            if (finalJustificativa) {
                methods.setValue('mentoringJustification', finalJustificativa);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state]);

    if (isLoading) {
        return <CycleLoading />;
    }

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
    }

    if (!currentCycle.isOpen) {
        return <CycleClosedMessage cycle={currentCycle} />;
    }

    if (evaluationStatus?.isSubmitted) {
        return (
            <EvaluationSubmittedMessage
                cycle={currentCycle}
                evaluationStatus={evaluationStatus}
            />
        );
    }

    return (
        <FormProvider {...methods}>
            <form>
                <EvaluationForm />
            </form>
        </FormProvider>
    );
}
