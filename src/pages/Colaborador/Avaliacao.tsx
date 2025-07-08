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
            const { mentoring, references, evaluation360, selfAssessment } = navigationState.geminiResponse;

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

            if (evaluation360 && evaluation360.length > 0) {
                methods.setValue('evaluation360', evaluation360.map(eval360 => ({
                    collaboratorId: eval360.collaboratorId,
                    rating: eval360.rating,
                    strengths: eval360.strengths,
                    improvements: eval360.improvements,
                    evaluation360IAValid: false
                })));
            }

            if (selfAssessment && selfAssessment.length > 0) {
                methods.setValue('selfAssessment', selfAssessment.map(selfAssess => ({
                    pilarId: selfAssess.pillarId,
                    criterionId: selfAssess.criteriaId,
                    rating: selfAssess.rating,
                    justification: selfAssess.justification,
                    selfAssessmentIAValid: false
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
