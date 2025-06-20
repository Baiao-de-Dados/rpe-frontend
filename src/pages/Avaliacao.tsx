import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FieldValues } from 'react-hook-form';
import { useEvaluationForm } from '../hooks/useEvaluationForm';
import { fullEvaluationSchema } from '../schemas/evaluation';
import { getSectionValidationStatus } from '../utils/formValidationHelpers';

import { EvaluationForm } from '../components/Evaluation/EvaluationForm';
import { EvaluationHeader } from '../components/Evaluation/EvaluationHeader';

export function Avaliacao() {
    const formMethods = useForm({
        resolver: zodResolver(fullEvaluationSchema),
        mode: 'onChange',
    });

    const {
        handleSubmit,
        watch,
        formState: { errors },
    } = formMethods;

    const references = watch('referencias');

    const mentoringRating = watch('mentoringRating');
    const mentoringJustification = watch('mentoringJustification');

    console.log(references);

    const sectionErrors = getSectionValidationStatus(errors);
    const hasMentoringErrors = sectionErrors.mentoring;
    const hasReferencesErrors = sectionErrors.references;

    const evaluationForm = useEvaluationForm({
        mentoringRating,
        mentoringJustification,
        mentoringHasErrors: hasMentoringErrors,
        referencesHasErrors: hasReferencesErrors,
    });

    const onSubmit = (data: FieldValues) => {
        console.log('Form submitted with data:', data);
    };

    return (
        <FormProvider {...formMethods}>
            <>
                <EvaluationHeader
                    activeSection={evaluationForm.activeSection}
                    isFormComplete={evaluationForm.isFormComplete}
                    onNavClick={evaluationForm.handleNavClick}
                    getNotification={evaluationForm.getNotification}
                    onSubmit={handleSubmit(onSubmit)}
                />
                <main className="p-8 pt-6">
                    <form>
                        <EvaluationForm {...evaluationForm.formProps} />
                    </form>
                </main>
            </>
        </FormProvider>
    );
}
