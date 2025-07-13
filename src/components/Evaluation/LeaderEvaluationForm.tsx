import { useMemo, memo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import type { Collaborator } from '../../types/collaborator';

import LeaderEvaluationHeader from './LeaderEvaluationHeader';

import { useSectionNavigation } from '../../hooks/useSectionNavigation';

import type { FullLeaderEvaluationFormData } from '../../schemas/leaderEvaluation';

import { LeaderSectionRenderer } from './SectionsLeader/LeaderSectionRenderer';
import { leaderEvaluationSections, type LeaderSectionType } from './SectionsLeader/LeaderEvaluationSections';

interface LeaderEvaluationFormProps {
    collaborator: Collaborator
    cycleName: string;
}

export const LeaderEvaluationForm = memo(({ collaborator, cycleName }: LeaderEvaluationFormProps) => {

    const { activeSection, navigateToSection, sections } =
        useSectionNavigation<LeaderSectionType>([...leaderEvaluationSections]);

    const { control } = useFormContext<FullLeaderEvaluationFormData>();

    const watchedGeneralRating = useWatch({
        control,
        name: 'generalRating',
    });

    const watchedGeneralJustification = useWatch({
        control,
        name: 'generalJustification',
    });


    const incompleteAssessmentCount = useMemo(() => {
        let incompleteCount = 0;

        if (!watchedGeneralRating || watchedGeneralRating <= 0) {
            incompleteCount++;
        }

        if (!watchedGeneralJustification || watchedGeneralJustification.trim().length === 0) {
            incompleteCount++;
        }

        return incompleteCount;
    }, [watchedGeneralRating, watchedGeneralJustification]);

    return (
        <>
            <LeaderEvaluationHeader
                activeSection={activeSection}
                onSectionChange={navigateToSection}
                sections={sections}
                collaborator={collaborator}
                cycleName={cycleName}
                incompleteAssessmentCount={incompleteAssessmentCount}
            />
            
            <main className="p-8 pt-6">
                <LeaderSectionRenderer 
                    activeSection={activeSection}
                    collaborator={collaborator}
                />
            </main>
        </>
    );
});
