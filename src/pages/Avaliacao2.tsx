import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    fullEvaluationSchema,
    type EvaluationFormData,
} from '../schemas/evaluation';
import { EvaluationForm } from '../components/Evaluation/EvaluationForm';
import { EvaluationHeader } from '../components/Evaluation/EvaluationHeader';
import FloatingSubmitButton from '../components/FloatingSubmitButton';

export function Avaliacao2() {
    const methods = useForm<EvaluationFormData>({
        resolver: zodResolver(fullEvaluationSchema),
        mode: 'onChange',
    });

    return (
        <>
            <EvaluationHeader />
            <FormProvider {...methods}>
                <FloatingSubmitButton />
                <main className="p-8 pt-6">
                    <form>
                        <EvaluationForm />
                    </form>
                </main>
            </FormProvider>
        </>
    );
}
