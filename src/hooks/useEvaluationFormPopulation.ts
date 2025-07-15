import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { UseFormReturn } from 'react-hook-form';

import type { NavigationState } from './api/useNotesAI';
import { useCollaboratorDraftQuery } from './api/useCollaboratorQuery';
import type { EvaluationFormData } from '../schemas/evaluation';
import { useCycle } from './useCycle';


export function useEvaluationFormPopulation(methods: UseFormReturn<EvaluationFormData>) {

    const location = useLocation();
    const navigate = useNavigate();
    const { currentCycle } = useCycle();
    const { data: draftData } = useCollaboratorDraftQuery(currentCycle?.id);

    useEffect(() => {
        const navigationState = location.state as NavigationState | null;

        let populated = false;

        if (location.state) {
            navigate(location.state.url, { replace: true });
        }

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
                populated = true;
            }

            if (evaluation360 && evaluation360.length > 0) {
                methods.setValue('evaluation360', evaluation360.map(eval360 => ({
                    collaboratorId: Number(eval360.collaboratorId),
                    rating: eval360.rating,
                    strengths: eval360.strengths,
                    improvements: eval360.improvements,
                    evaluation360IAValid: false
                })));
                populated = true;
            }

            if (mentoring) {
                methods.setValue('mentoringRating', mentoring.rating ?? 0);
                methods.setValue('mentoringJustification', mentoring.justification ?? '');
                methods.setValue('mentoringIAValid', false, { shouldValidate: true });
                populated = true;
            }

            if (references && references.length > 0) {
                methods.setValue('references', references.map(ref => ({
                    collaboratorId: Number(ref.collaboratorId),
                    justification: ref.justification,
                    referencesIAValid: false
                })));
                populated = true;
            }
        }

        // Preenche campos vazios com draft
        if (draftData) {
            // SelfAssessment
            if (draftData.draft?.selfAssessment?.length) {
                const current = methods.getValues('selfAssessment') || [];
                let filled;
                if (!current.length) {
                    // Inicializa com o draft se o formulário estiver vazio
                    filled = draftData.draft.selfAssessment.map(draftItem => ({
                        pilarId: Number(draftItem.pillarId),
                        criterionId: Number(draftItem.criteriaId),
                        rating: draftItem.rating || 0,
                        justification: draftItem.justification || '',
                        selfAssessmentIAValid: true
                    }));
                } else {
                    filled = current.map((item, idx) => {
                        const draftItem = draftData.draft.selfAssessment[idx];
                        return {
                            ...item,
                            rating: item.rating || draftItem?.rating || 0,
                            justification: item.justification || draftItem?.justification || '',
                        };
                    });
                }
                methods.setValue('selfAssessment', filled);
                populated = true;
            }
            // Evaluation360
            if (draftData.draft?.evaluation360?.length) {
                const current = methods.getValues('evaluation360') || [];
                let filled;
                if (!current.length) {
                    filled = draftData.draft.evaluation360.map(draftItem => ({
                        collaboratorId: Number(draftItem.evaluateeId),
                        rating: draftItem.rating || 0,
                        strengths: draftItem.strengths || '',
                        improvements: draftItem.improvements || '',
                        evaluation360IAValid: true
                    }));
                } else {
                    filled = current.map((item, idx) => {
                        const draftItem = draftData.draft.evaluation360[idx];
                        return {
                            ...item,
                            rating: item.rating || draftItem?.rating || 0,
                            strengths: item.strengths || draftItem?.strengths || '',
                            improvements: item.improvements || draftItem?.improvements || '',
                        };
                    });
                }
                methods.setValue('evaluation360', filled);
                populated = true;
            }
            // Mentoring
            if (draftData.draft?.mentoring) {
                if (!methods.getValues('mentoringRating')) {
                    methods.setValue('mentoringRating', draftData.draft.mentoring.rating || 0);
                    populated = true;
                }
                if (!methods.getValues('mentoringJustification')) {
                    methods.setValue('mentoringJustification', draftData.draft.mentoring.justification || '');
                    populated = true;
                }
                if (methods.getValues('mentoringIAValid') === undefined) {
                    methods.setValue('mentoringIAValid', true, { shouldValidate: true });
                    populated = true;
                }
                if (methods.getValues('mentorId') === undefined) {
                    methods.setValue('mentorId', draftData.draft.mentoring.mentorId);
                }
            }
            // References
            if (draftData.draft?.references?.length) {
                const current = methods.getValues('references') || [];
                let filled;
                if (!current.length) {
                    filled = draftData.draft.references.map(draftItem => ({
                        collaboratorId: Number(draftItem.collaboratorId),
                        justification: draftItem.justification || '',
                        referencesIAValid: true
                    }));
                } else {
                    filled = current.map((item, idx) => {
                        const draftItem = draftData.draft.references[idx];
                        return {
                            ...item,
                            justification: item.justification || draftItem?.justification || '',
                        };
                    });
                }
                methods.setValue('references', filled);

                populated = true;
            }
        }

        // Força validação do formulário se algum campo foi populado
        if (populated) {
            console.log("salve")
            methods.trigger();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state, draftData]);
}
