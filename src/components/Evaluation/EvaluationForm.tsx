import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { SectionRenderer } from './SectionRenderer';
import { EvaluationHeader } from './EvaluationHeader';
import { mockEvaluationPillars } from '../../data/mockEvaluationPIllars';
import { useSectionNavigation } from '../../hooks/useSectionNavigation';
import type { EvaluationFormData } from '../../schemas/evaluation';

export function EvaluationForm() {
    const { activeSection, navigateToSection, sections } =
        useSectionNavigation();

    const { control } = useFormContext<EvaluationFormData>();

    const allCriteria = useMemo(() => {
        return [
            ...mockEvaluationPillars.comportamento.criterios,
            ...mockEvaluationPillars.execucao.criterios,
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

    const incompleteSelfAssessmentCount = useMemo(() => {
        if (!watchedSelfAssessment || !Array.isArray(watchedSelfAssessment)) {
            return allCriteria.length;
        }

        let incompleteCount = 0;

        for (let i = 0; i < allCriteria.length; i++) {
            const assessment = watchedSelfAssessment[i];
            const hasRating =
                assessment?.rating &&
                typeof assessment.rating === 'number' &&
                assessment.rating > 0;
            const hasJustification =
                assessment?.justification &&
                typeof assessment.justification === 'string' &&
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
        const hasJustification =
            justification &&
            typeof justification === 'string' &&
            justification.trim().length > 0;

        return hasRating && hasJustification ? 0 : 1;
    }, [watchedMentoring]);

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

            const hasCollaboratorId =
                evaluation.collaboratorId &&
                typeof evaluation.collaboratorId === 'string' &&
                evaluation.collaboratorId.trim().length > 0;
            const hasRating =
                evaluation.rating &&
                typeof evaluation.rating === 'number' &&
                evaluation.rating > 0;
            const hasStrengths =
                evaluation.strengths &&
                typeof evaluation.strengths === 'string' &&
                evaluation.strengths.trim().length > 0;
            const hasImprovements =
                evaluation.improvements &&
                typeof evaluation.improvements === 'string' &&
                evaluation.improvements.trim().length > 0;

            if (
                !hasCollaboratorId ||
                !hasRating ||
                !hasStrengths ||
                !hasImprovements
            ) {
                incompleteCount++;
            }
        }

        return incompleteCount;
    }, [watchedEvaluation360]);

    // Calcula as referências incompletas
    const incompleteReferencesCount = useMemo(() => {
        if (!watchedReferences || !Array.isArray(watchedReferences)) {
            // Se não há referências, retorna 0 (não é obrigatório)
            return 0;
        }

        if (watchedReferences.length === 0) {
            // Se array existe mas está vazio, retorna 0 (não é obrigatório)
            return 0;
        }

        let incompleteCount = 0;

        for (const reference of watchedReferences) {
            if (!reference) {
                incompleteCount++;
                continue;
            }

            const hasCollaboratorId =
                reference.collaboratorId &&
                typeof reference.collaboratorId === 'string' &&
                reference.collaboratorId.trim().length > 0;
            const hasJustification =
                reference.justification &&
                typeof reference.justification === 'string' &&
                reference.justification.trim().length > 0;

            if (!hasCollaboratorId || !hasJustification) {
                incompleteCount++;
            }
        }

        return incompleteCount;
    }, [watchedReferences]);

    return (
        <>
            <EvaluationHeader
                activeSection={activeSection}
                onSectionChange={navigateToSection}
                sections={sections}
                incompleteSelfAssessmentCount={incompleteSelfAssessmentCount}
                incompleteMentoringCount={incompleteMentoringCount}
                incompleteEvaluation360Count={incompleteEvaluation360Count}
                incompleteReferencesCount={incompleteReferencesCount}
            />
            <main className="p-8 pt-6">
                <SectionRenderer activeSection={activeSection} />
            </main>
        </>
    );
}
