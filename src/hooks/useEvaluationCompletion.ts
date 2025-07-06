import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import type { EvaluationFormData } from '../schemas/evaluation';

import { mockEvaluationPillars } from '../data/mockEvaluationPIllars';

export function useEvaluationCompletion() {

    const { control } = useFormContext<EvaluationFormData>();

    const allCriteria = useMemo(() => {
        return [
            ...mockEvaluationPillars.gestaoLideranca.criterios,
        ];
    }, []);

    const watchedSelfAssessment = useWatch({
        control,
        name: 'selfAssessment',
    });

    const watchedMentoring = useWatch({
        control,
        name: ['mentoringRating', 'mentoringJustification'],
    });

    const watchedEvaluation360 = useWatch({
        control,
        name: 'evaluation360',
    });

    const watchedReferences = useWatch({
        control,
        name: 'references',
    });

    const mentoringIAValid = useWatch({ 
        control, name: 'mentoringIAValid' 
    });

    const incompleteSelfAssessmentCount = useMemo(() => {
        if (!watchedSelfAssessment || !Array.isArray(watchedSelfAssessment)) {
            return allCriteria.length;
        }

        let incompleteCount = 0;

        for (let i = 0; i < allCriteria.length; i++) {
            const assessment = watchedSelfAssessment[i];

            const hasRating = assessment?.rating && typeof assessment.rating === 'number' && assessment.rating > 0;

            const hasJustification = assessment?.justification && typeof assessment.justification === 'string' && 
            assessment.justification.trim().length > 0;

            if (!hasRating || !hasJustification) {
                incompleteCount++;
            }
        }

        return incompleteCount;
    }, [watchedSelfAssessment, allCriteria.length]);

    const incompleteMentoringCount = useMemo(() => {
        if (!watchedMentoring || !Array.isArray(watchedMentoring)) {
            return 1;
        }
        const [rating, justification] = watchedMentoring;
        const hasRating = rating && typeof rating === 'number' && rating > 0;

        const hasJustification = justification && typeof justification === 'string' && justification.trim().length > 0;

        return hasRating && hasJustification && mentoringIAValid === true ? 0 : 1;
    }, [watchedMentoring, mentoringIAValid]);

    const incompleteEvaluation360Count = useMemo(() => {
        if (!watchedEvaluation360 || !Array.isArray(watchedEvaluation360)) {
            return null;
        }

        if (watchedEvaluation360.length === 0) {
            return null;
        }

        let incompleteCount = 0;

        for (const evaluation of watchedEvaluation360) {
            if (!evaluation) {
                incompleteCount++;
                continue;
            }

            const hasCollaboratorId = evaluation.collaboratorId && typeof evaluation.collaboratorId === 'string' &&
            evaluation.collaboratorId.trim().length > 0;

            const hasRating = evaluation.rating && typeof evaluation.rating === 'number' && evaluation.rating > 0;

            const hasStrengths = evaluation.strengths && typeof evaluation.strengths === 'string' && 
            evaluation.strengths.trim().length > 0;

            const hasImprovements = evaluation.improvements && typeof evaluation.improvements === 'string' &&
            evaluation.improvements.trim().length > 0;

            const isIAValidated = evaluation.evaluation360IAValid === true;

            if (
                !hasCollaboratorId ||
                !hasRating ||
                !hasStrengths ||
                !hasImprovements ||
                !isIAValidated
            ) {
                incompleteCount++;
            }
        }

        return incompleteCount;
    }, [watchedEvaluation360]);

    const incompleteReferencesCount = useMemo(() => {
        if (!watchedReferences || !Array.isArray(watchedReferences)) {
            return 0;
        }

        if (watchedReferences.length === 0) {
            return 0;
        }

        let incompleteCount = 0;

        for (const reference of watchedReferences) {
            if (!reference) {
                incompleteCount++;
                continue;
            }

            const hasCollaboratorId = reference.collaboratorId && typeof reference.collaboratorId === 'string' &&
            reference.collaboratorId.trim().length > 0;

            const hasJustification = reference.justification && typeof reference.justification === 'string' &&
            reference.justification.trim().length > 0;

            const isIAValidated = reference.referencesIAValid === true;

            if (!hasCollaboratorId || !hasJustification || !isIAValidated) {
                incompleteCount++;
            }
        }

        return incompleteCount;
    }, [watchedReferences]);

    return {
        incompleteSelfAssessmentCount,
        incompleteMentoringCount,
        incompleteEvaluation360Count,
        incompleteReferencesCount,
    };
}
