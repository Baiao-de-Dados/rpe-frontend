import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fullEvaluationSchema } from '../schemas/evaluation';
import { EvaluationForm } from '../components/Evaluation/EvaluationForm';
import { EvaluationHeader } from '../components/Evaluation/EvaluationHeader';

type MentoringFormData = {
    mentoringRating: number;
    mentoringJustification: string;
};

export function Avaliacao2() {
    const methods = useForm<MentoringFormData>({
        resolver: zodResolver(fullEvaluationSchema),
    });

    return (
        <>
            <FormProvider {...methods}>
                <EvaluationHeader />
                <main className="p-8 pt-6">
                    <form>
                        <EvaluationForm />
                    </form>
                </main>
            </FormProvider>
        </>
    );
}
