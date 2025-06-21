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

    // Calcula quantos campos de mentoring estão incompletos
    const incompleteMentoringCount = useMemo(() => {
        if (!watchedMentoring || !Array.isArray(watchedMentoring)) {
            return 1; // 1 card de mentoring incompleto
        }

        const [rating, justification] = watchedMentoring;

        const hasRating = rating && typeof rating === 'number' && rating > 0;
        const hasJustification =
            justification &&
            typeof justification === 'string' &&
            justification.trim().length > 0;

        // Se ambos estão preenchidos, retorna 0, senão retorna 1 (card incompleto)
        return hasRating && hasJustification ? 0 : 1;
    }, [watchedMentoring]);

    return (
        <>
            <EvaluationHeader
                activeSection={activeSection}
                onSectionChange={navigateToSection}
                sections={sections}
                incompleteSelfAssessmentCount={incompleteSelfAssessmentCount}
                incompleteMentoringCount={incompleteMentoringCount}
            />
            <main className="p-8 pt-6">
                <SectionRenderer activeSection={activeSection} />
            </main>
        </>
    );
}
