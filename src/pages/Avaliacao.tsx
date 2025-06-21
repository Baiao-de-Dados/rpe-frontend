import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import {
    fullEvaluationSchema,
    type EvaluationFormData,
} from '../schemas/evaluation';
import { EvaluationForm } from '../components/Evaluation/EvaluationForm';
import EvaluationSubmitButton from '../components/Evaluation/EvaluationSubmitButton';
import CycleClosedMessage from '../components/Evaluation/CycleClosedMessage';
import EvaluationSubmittedMessage from '../components/Evaluation/EvaluationSubmittedMessage';
import Typography from '../components/Typography';
import Button from '../components/Button';
import CardContainer from '../components/CardContainer';
import { useCycle } from '../hooks/useCycle';
import { AlertCircle, RefreshCw } from 'lucide-react';

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
        return (
            <div className="flex items-center justify-center min-h-[60vh] p-6">
                <CardContainer className="max-w-md mx-auto text-center border-2 border-error-200 bg-error-50/50">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-primary-500" />
                        </div>
                    </div>

                    <Typography
                        variant="h2"
                        color="primary500"
                        className="mb-4"
                    >
                        Ops! Algo deu errado
                    </Typography>

                    <Typography
                        variant="body"
                        color="muted"
                        className="mb-6 leading-relaxed"
                    >
                        Não foi possível carregar as informações do ciclo de
                        avaliação. Verifique sua conexão e tente novamente.
                    </Typography>

                    <div className="space-y-3">
                        <Button
                            variant="primary"
                            onClick={() => window.location.reload()}
                            className="w-full gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Tentar novamente
                        </Button>

                        <Typography
                            variant="caption"
                            color="muted"
                            className="block"
                        >
                            Se o problema persistir, entre em contato com o
                            suporte.
                        </Typography>
                    </div>
                </CardContainer>
            </div>
        );
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
            <EvaluationSubmitButton />
            <form>
                <EvaluationForm />
            </form>
        </FormProvider>
    );
}
