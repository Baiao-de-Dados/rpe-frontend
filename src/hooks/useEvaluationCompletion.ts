import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import type { EvaluationFormData } from '../schemas/evaluation';

import type { Criterion } from '../data/mockEvaluationPIllars';
import { mockEvaluationPillars } from '../data/mockEvaluationPIllars';

export function useEvaluationCompletion() {

    const { control } = useFormContext<EvaluationFormData>();

    const allCriteria = useMemo(() => {
        return Object.values(mockEvaluationPillars).flatMap(pillar => pillar.criterios);
    }, []);

    const watchedSelfAssessment = useWatch({
        control,
        name: 'selfAssessment',
    });

    const watchedEvaluation360 = useWatch({
        control,
        name: 'evaluation360',
    });

    const watchedMentoring = useWatch({
        control,
        name: ['mentoringRating', 'mentoringJustification', 'mentoringIAValid'],
    });

    const watchedReferences = useWatch({
        control,
        name: 'references',
    });

    const getIncompleteCriteriaCountForPillar = (
        criteria: Criterion[],
        validFields: Array<{
            id: number;
            pilarId: number;
            criterionId: number;
            index: number;
        }>
    ) => {
        if (!watchedSelfAssessment || !Array.isArray(watchedSelfAssessment)) {
            return criteria.length;
        }
        const fieldIndices = criteria
            .map(criterion =>
                validFields.findIndex(f => f.criterionId === criterion.id),
            )
            .filter(index => index !== -1);
        let incompleteCount = 0;
        for (let i = 0; i < fieldIndices.length; i++) {
            const fieldIndex = fieldIndices[i];
            const assessment = watchedSelfAssessment[fieldIndex];
            const hasRating = assessment?.rating && typeof assessment.rating === 'number' && assessment.rating > 0;
            const hasJustification = assessment?.justification && typeof assessment.justification === 'string' && 
                assessment.justification.trim().length > 0;
            const isIAValid = assessment?.selfAssessmentIAValid === true;
            if (!hasRating || !hasJustification || !isIAValid) {
                incompleteCount++;
            }
        }
        return incompleteCount;
    };

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
            const isIAValid = assessment?.selfAssessmentIAValid === true;
            if (!hasRating || !hasJustification || !isIAValid) {
                incompleteCount++;
            }
        }
        return incompleteCount;
    }, [watchedSelfAssessment, allCriteria.length]);

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
            const hasCollaboratorId = typeof evaluation.collaboratorId === 'number';
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

    const incompleteMentoringCount = useMemo(() => {
        if (!watchedMentoring || !Array.isArray(watchedMentoring)) {
            return 1;
        }
        const [rating, justification, mentoringIAValid] = watchedMentoring;
        const hasRating = rating && typeof rating === 'number' && rating > 0;

        const hasJustification = justification && typeof justification === 'string' && justification.trim().length > 0;

        return hasRating && hasJustification && mentoringIAValid === true ? 0 : 1;
    }, [watchedMentoring]);

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
            const hasCollaboratorId = typeof reference.collaboratorId === 'number';
            const hasJustification = reference.justification && typeof reference.justification === 'string' &&
            reference.justification.trim().length > 0;
            const isIAValidated = reference.referencesIAValid === true;
            if (!hasCollaboratorId || !hasJustification || !isIAValidated) {
                incompleteCount++;
            }
        }
        return incompleteCount;
    }, [watchedReferences]);

    const getHasPendingIAForPillar = (
        criteria: Criterion[],
        validFields: Array<{
            id: number;
            pilarId: number;
            criterionId: number;
            index: number;
        }>
    ) => {
        if (!watchedSelfAssessment || !Array.isArray(watchedSelfAssessment)) {
            return false;
        }
        const fieldIndices = criteria
            .map(criterion =>
                validFields.findIndex(f => f.criterionId === criterion.id),
            )
            .filter(index => index !== -1);
        for (let i = 0; i < fieldIndices.length; i++) {
            const fieldIndex = fieldIndices[i];
            const assessment = watchedSelfAssessment[fieldIndex];
            if (assessment?.selfAssessmentIAValid === false) {
                return true;
            }
        }
        return false;
    };

    return {
        incompleteSelfAssessmentCount,
        incompleteEvaluation360Count,
        incompleteMentoringCount,
        incompleteReferencesCount,
        getIncompleteCriteriaCountForPillar,
        getHasPendingIAForPillar,
    };
}
