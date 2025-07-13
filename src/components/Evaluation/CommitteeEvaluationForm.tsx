import { useMemo, memo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import type { Collaborator } from '../../types/collaborator';

import CommitteeEvaluationHeader from './CommitteeEvaluationHeader';

import { useSectionNavigation } from '../../hooks/useSectionNavigation';

import { CommitteeSectionRenderer } from './SectionsCommittee/CommitteeSectionRenderer';
import { committeeEvaluationSections, type CommitteeSectionType } from './SectionsCommittee/CommitteeEvaluationSections';


interface CommitteeEvaluationFormProps {
    collaborator: Collaborator;
    cycleName: string;
    collaboratorSelfAssessment?: Array<{
        pilarId: number;
        criterionId: number;
        rating?: number | null;
        justification?: string;
    }>;
    evaluations360?: Array<{
        collaratorName: string;
        collaboratorPosition: string;
        rating: number;
        improvements: string;
        strengths: string;
    }>;
    referencesReceived?: Array<{
        collaratorName: string;
        collaboratorPosition: string;
        justification: string;
    }>;
    isSubmitting?: boolean;
    onSaveEqualization?: () => void;
}

export const CommitteeEvaluationForm = memo(({
    collaborator,
    cycleName,
    collaboratorSelfAssessment,
    evaluations360,
    referencesReceived,
    isSubmitting,
    onSaveEqualization
}: CommitteeEvaluationFormProps) => {
    const { activeSection, navigateToSection, sections } =
        useSectionNavigation<CommitteeSectionType>([...committeeEvaluationSections]);

    const { control } = useFormContext();

    const watchedEqualization = useWatch({
        control,
        name: 'committeeEqualization',
    });

    const isEqualizationComplete = useMemo(() => {
        if (!watchedEqualization) return false;
        const { finalScore, comments } = watchedEqualization;
        return (
            typeof finalScore === 'number' && 
            finalScore > 0 && 
            typeof comments === 'string' && 
            comments.trim().length > 0
        );
    }, [watchedEqualization]);

    return (
        <>
            <CommitteeEvaluationHeader
                activeSection={activeSection}
                onSectionChange={navigateToSection}
                sections={sections}
                collaborator={collaborator}
                cycleName={cycleName}
                isEqualizationComplete={isEqualizationComplete}
                isSubmitting={isSubmitting}
                onSaveEqualization={onSaveEqualization}
            />
            <main className="p-8 pt-6">
                <CommitteeSectionRenderer 
                    activeSection={activeSection}
                    collaborator={collaborator}
                    collaboratorSelfAssessment={collaboratorSelfAssessment}
                    evaluations360={evaluations360}
                    referencesReceived={referencesReceived}
                    cycleName={cycleName}
                />
            </main>
        </>
    );
});
