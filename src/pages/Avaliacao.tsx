import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import {
    fullEvaluationSchema,
    type EvaluationFormData,
} from '../schemas/evaluation';

import { EvaluationForm } from '../components/Evaluation/EvaluationForm';
import FloatingSubmitButton from '../components/Evaluation/FloatingSubmitButton';

export function Avaliacao() {
    const methods = useForm<EvaluationFormData>({
        resolver: zodResolver(fullEvaluationSchema),
        mode: 'onSubmit',
    });

    return (
        <FormProvider {...methods}>
            <FloatingSubmitButton />
            <form>
                <EvaluationForm />
            </form>
        </FormProvider>
    );
}
