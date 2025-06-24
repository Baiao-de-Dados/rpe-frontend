import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import {
    fullEvaluationSchema,
    type EvaluationFormData,
} from '../../schemas/evaluation';
import { EvaluationForm } from '../../components/Evaluation/EvaluationForm';
import CycleClosedMessage from '../../components/Evaluation/CycleClosedMessage';
import EvaluationSubmittedMessage from '../../components/Evaluation/EvaluationSubmittedMessage';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import Typography from '../../components/Typography';
import { useCycle } from '../../hooks/useCycle';

export function Avaliacao() {
    const { currentCycle, evaluationStatus, isLoading } = useCycle();

    const methods = useForm<EvaluationFormData>({
        resolver: zodResolver(fullEvaluationSchema),
        mode: 'onSubmit',
    });

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
