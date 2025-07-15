import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import { useCycle } from '../../hooks/useCycle';
import { useCollaboratorEvaluationQuery } from '../../hooks/api/useCollaboratorQuery';
import { useEvaluationFormPopulation } from '../../hooks/useEvaluationFormPopulation';

import { fullEvaluationSchema, type EvaluationFormData } from '../../schemas/evaluation';

import CycleLoading from '../../components/common/CycleLoading';
import AllEvaluation from '../../components/Evaluation/AllEvaluation';
import { EvaluationForm } from '../../components/Evaluation/EvaluationForm';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import EvaluationSubmittedMessage from '../../components/Evaluation/EvaluationSubmittedMessage';
import type { Cycle } from '../../types/cycle';

export function CollaboratorAvaliacao() {
    const { currentCycle, isLoading } = useCycle();
    const evaluationQuery = useCollaboratorEvaluationQuery(currentCycle?.id, { enabled: !!currentCycle?.id });

    const methods = useForm<EvaluationFormData>({
        resolver: zodResolver(fullEvaluationSchema),
        mode: 'onSubmit',
    });

    useEvaluationFormPopulation(methods);

    if (isLoading) {
        return <CycleLoading />;
    }

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
    }

    if (!currentCycle.isActive) {
        return <AllEvaluation />;
    }
    
    if (evaluationQuery.data) {
        return (
            <EvaluationSubmittedMessage
                cycle={currentCycle as Cycle}
                submittedAt={evaluationQuery.data.sentDate}
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
