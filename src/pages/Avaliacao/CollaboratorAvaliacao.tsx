import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import { useCycle } from '../../hooks/useCycle';
import { useCollaboratorDraftQuery, useCollaboratorEvaluationQuery } from '../../hooks/api/useCollaboratorQuery';
import { useEvaluationFormPopulation } from '../../hooks/useEvaluationFormPopulation';

import { fullEvaluationSchema, type EvaluationFormData } from '../../schemas/evaluation';

import CycleLoading from '../../components/common/CycleLoading';
import { EvaluationForm } from '../../components/Evaluation/EvaluationForm';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import EvaluationSubmittedMessage from '../../components/Evaluation/EvaluationSubmittedMessage';
import CycleClosedEvaluationMessage from '../../components/CycleMessages/CycleClosedEvaluationMessage';
import type { Cycle } from '../../types/cycle';
import { useEffect } from 'react';
import AllEvaluation from '../../components/Evaluation/AllEvaluation';

export function CollaboratorAvaliacao() {

    const { currentCycle, isLoading, status } = useCycle();

    const { data, isLoading: isLoadingEvaluation } = useCollaboratorEvaluationQuery(currentCycle?.id, { enabled: !!currentCycle?.id });

    const { data: draftData } = useCollaboratorDraftQuery(currentCycle?.id);

    const methods = useForm<EvaluationFormData>({
        resolver: zodResolver(fullEvaluationSchema),
        mode: 'onSubmit',
    });

    useEvaluationFormPopulation(methods);

    useEffect(() => {
        if (draftData) {
            const timeout = setTimeout(() => {
            methods.trigger();
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [draftData, methods]);

    if (isLoading || isLoadingEvaluation) {
        return <CycleLoading />;
    }

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
    }

    if (!currentCycle.isActive) {
        return <AllEvaluation />;
    }

    // ✅ CORREÇÃO: Colaboradores só podem fazer avaliações quando o ciclo estiver aberto
    if (status !== 'open') {
        return <CycleClosedEvaluationMessage cycleName={currentCycle?.name} className="mb-6" />;
    }

    if (data) {
        return (
            <EvaluationSubmittedMessage
                cycle={currentCycle as Cycle}
                submittedAt={data.sentDate}
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
