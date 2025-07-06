import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import { useCycle } from '../../hooks/useCycle';

import type { NavigationState } from '../../hooks/useNotes';

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
        const navigationState = location.state as NavigationState | null;

        if (navigationState?.geminiResponse) {
            const { mentoring, references } = navigationState.geminiResponse;

            if (mentoring) {
                methods.setValue('mentoringRating', mentoring.rating ?? 0);
                methods.setValue('mentoringJustification', mentoring.justification ?? '');
                methods.setValue('mentoringIAValid', false, { shouldValidate: true });
            }

            if (references && references.length > 0) {
                methods.setValue('references', references.map(ref => ({
                    collaboratorId: ref.collaboratorId,
                    justification: ref.justification,
                    referencesIAValid: false
                })));
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
