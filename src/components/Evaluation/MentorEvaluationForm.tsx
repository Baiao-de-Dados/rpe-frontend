import { useMemo, memo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import MentorEvaluationHeader from './MentorEvaluationHeader';
import { MentorSectionRenderer } from './SectionsMentor/MentorSectionRenderer';
import { mentorEvaluationSections, type MentorSectionType } from './SectionsMentor/MentorEvaluationSections';

import { useSectionNavigation } from '../../hooks/useSectionNavigation';

import type { FullMentorEvaluationFormData } from '../../schemas/mentorEvaluation';
import { mockEvaluationPillars } from '../../data/mockEvaluationPIllars';

interface MentorEvaluationFormProps {
    collaborator: {
        id: string;
        nome: string;
        cargo: string;
        image?: string;
        avatar?: string;
    };
    cycleName: string;
    // Dados da autoavaliação do colaborador (read-only)
    collaboratorSelfAssessment?: Array<{
        pilarId: string;
        criterionId: string;
        rating?: number | null;
        justification?: string;
    }>;
}

export const MentorEvaluationForm = memo(({
    collaborator,
    cycleName,
    collaboratorSelfAssessment
}: MentorEvaluationFormProps) => {

    const { activeSection, navigateToSection, sections } =
        useSectionNavigation<MentorSectionType>([...mentorEvaluationSections]);

    const { control } = useFormContext<FullMentorEvaluationFormData>();

    const allCriteria = useMemo(() => {
        return [
            ...mockEvaluationPillars.comportamento.criterios,
            ...mockEvaluationPillars.execucao.criterios,
            ...mockEvaluationPillars.gestaoLideranca.criterios,
        ];
    }, []);

    const watchedMentorAssessment = useWatch({
        control,
        name: 'mentorAssessment',
    });

    const watchedGeneralAssessment = useWatch({
        control,
        name: ['generalRating', 'generalJustification'],
    });

    const incompleteSelfAssessmentCount = useMemo(() => {
        if (!watchedMentorAssessment || !Array.isArray(watchedMentorAssessment)) {
            return allCriteria.length;
        }

        let incompleteCount = 0;

        for (let i = 0; i < allCriteria.length; i++) {
            const assessment = watchedMentorAssessment[i];

            const hasRating = assessment?.rating && typeof assessment.rating === 'number' && assessment.rating > 0;

            const hasJustification = assessment?.justification && typeof assessment.justification === 'string' && 
            assessment.justification.trim().length > 0;

            if (!hasRating || !hasJustification) {
                incompleteCount++;
            }
        }

        return incompleteCount;
    }, [watchedMentorAssessment, allCriteria.length]);

    const incompleteGeneralAssessmentCount = useMemo(() => {
        if (!watchedGeneralAssessment || !Array.isArray(watchedGeneralAssessment)) {
            return 1;
        }

        const [rating, justification] = watchedGeneralAssessment;

        const hasRating = rating && typeof rating === 'number' && rating > 0;

        const hasJustification = justification && typeof justification === 'string' && justification.trim().length > 0;

        return hasRating && hasJustification ? 0 : 1;
    }, [watchedGeneralAssessment]);

    return (
        <>
            <MentorEvaluationHeader
                activeSection={activeSection}
                onSectionChange={navigateToSection}
                sections={sections}
                collaborator={collaborator}
                cycleName={cycleName}
                incompleteSelfAssessmentCount={incompleteSelfAssessmentCount}
                incompleteGeneralAssessmentCount={incompleteGeneralAssessmentCount}
            />
            
            <main className="p-8 pt-6">
                <MentorSectionRenderer 
                    activeSection={activeSection}
                    collaboratorSelfAssessment={collaboratorSelfAssessment}
                />
            </main>
        </>
    );
});
