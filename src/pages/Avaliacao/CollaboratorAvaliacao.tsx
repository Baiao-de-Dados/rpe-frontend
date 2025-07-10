import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import { fullEvaluationSchema, type EvaluationFormData } from '../../schemas/evaluation';

import { useCycle } from '../../hooks/useCycle';

import CycleLoading from '../../components/common/CycleLoading';
import AllEvaluation from '../../components/Evaluation/AllEvaluation';
import { EvaluationForm } from '../../components/Evaluation/EvaluationForm';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import EvaluationSubmittedMessage from '../../components/Evaluation/EvaluationSubmittedMessage';

export function CollaboratorAvaliacao() {

    const { currentCycle, evaluationStatus, isLoading } = useCycle();

    const methods = useForm<EvaluationFormData>({
        resolver: zodResolver(fullEvaluationSchema),
        mode: 'onSubmit',
    });

    if (isLoading) {
        return <CycleLoading />;
    }

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
    }

    if (evaluationStatus?.isSubmitted) {
        return (
            <EvaluationSubmittedMessage
                cycle={currentCycle}
                evaluationStatus={evaluationStatus}
            />
        );
    }

    if (!currentCycle.isActive) {
        return <AllEvaluation />;
    }

    return (
        <FormProvider {...methods}>
            <form>
                <EvaluationForm />
            </form>
        </FormProvider>
    );
}
