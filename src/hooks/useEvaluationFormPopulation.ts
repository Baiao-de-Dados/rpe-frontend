import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { UseFormReturn } from 'react-hook-form';

import type { NavigationState } from './api/useNotesAI';
import type { EvaluationFormData } from '../schemas/evaluation';

export function useEvaluationFormPopulation(methods: UseFormReturn<EvaluationFormData>) {

    const location = useLocation();

    useEffect(() => {

        const navigationState = location.state as NavigationState | null;

        if (navigationState?.geminiResponse) {

            const { selfAssessment, evaluation360, mentoring, references } = navigationState.geminiResponse;

            if (selfAssessment && selfAssessment.length > 0) {
                methods.setValue('selfAssessment', selfAssessment.map(selfAssess => ({
                    pilarId: Number(selfAssess.pillarId),
                    criterionId: Number(selfAssess.criteriaId),
                    rating: selfAssess.rating,
                    justification: selfAssess.justification,
                    selfAssessmentIAValid: (selfAssess.rating === 0 && selfAssess.justification === '') ? true : false
                })));
            }

            if (evaluation360 && evaluation360.length > 0) {
                methods.setValue('evaluation360', evaluation360.map(eval360 => ({
                    collaboratorId: Number(eval360.collaboratorId),
                    rating: eval360.rating,
                    strengths: eval360.strengths,
                    improvements: eval360.improvements,
                    evaluation360IAValid: false
                })));
            }

            if (mentoring) {
                methods.setValue('mentoringRating', mentoring.rating ?? 0);
                methods.setValue('mentoringJustification', mentoring.justification ?? '');
                methods.setValue('mentoringIAValid', false, { shouldValidate: true });
            }

            if (references && references.length > 0) {
                methods.setValue('references', references.map(ref => ({
                    collaboratorId: Number(ref.collaboratorId),
                    justification: ref.justification,
                    referencesIAValid: false
                })));
            }

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state]);

}
