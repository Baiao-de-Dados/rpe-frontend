import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import {
    fullEvaluationSchema,
    type EvaluationFormData,
} from '../schemas/evaluation';
import { EvaluationForm } from '../components/Evaluation/EvaluationForm';
import CycleClosedMessage from '../components/Evaluation/CycleClosedMessage';
import EvaluationSubmittedMessage from '../components/Evaluation/EvaluationSubmittedMessage';
import CycleLoadErrorMessage from '../components/Evaluation/CycleLoadErrorMessage';
import Typography from '../components/Typography';
import { useCycle } from '../hooks/useCycle';
import { useLocation } from 'react-router-dom';

export function Avaliacao() {
    const { currentCycle, evaluationStatus, isLoading } = useCycle();
    const location = useLocation();

    const methods = useForm<EvaluationFormData>({
        resolver: zodResolver(fullEvaluationSchema),
        mode: 'onSubmit',
    });

    // Preenche mentoring automaticamente se vier no state
    useEffect(() => {
        if (location.state) {
            const {
                mentoringNota,
                mentoringJustificativa,
                nota,
                justificativa,
            } = location.state;
            if (mentoringNota || nota) {
                methods.setValue('mentoringRating', mentoringNota ?? nota);
            }
            if (mentoringJustificativa || justificativa) {
                let justificativaDecoded = mentoringJustificativa ?? justificativa;
                // Remove chaves extras do início/fim, se houver
                justificativaDecoded = justificativaDecoded.trim().replace(/^\{+/, '').replace(/\}+$/, '');
                try {
                    // Decodifica unicode se necessário
                    justificativaDecoded = JSON.parse('"' + justificativaDecoded.replace(/"/g, '\\"') + '"');
                } catch {}
                methods.setValue(
                    'mentoringJustification',
                    justificativaDecoded
                );
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] p-6">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
                    <Typography
                        variant="body"
                        color="muted"
                        className="font-medium"
                    >
                        Carregando informações do ciclo...
                    </Typography>
                </div>
            </div>
        );
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
