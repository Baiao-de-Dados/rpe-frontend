import { memo } from 'react';
import PageHeader from '../common/PageHeader';
import type { PageHeaderSection } from '../common/PageHeader';
import EvaluationSubmitButton from './EvaluationSubmitButton';
import type { SectionType } from './Sections/EvaluationSections';

interface EvaluationHeaderProps {
    activeSection: SectionType;
    onSectionChange: (section: SectionType) => void;
    sections: SectionType[];
    incompleteSelfAssessmentCount?: number;
    incompleteMentoringCount?: number;
    incompleteEvaluation360Count?: number | null;
    incompleteReferencesCount?: number;
}

function EvaluationHeaderComponent({
    activeSection,
    onSectionChange,
    sections,
    incompleteSelfAssessmentCount = 0,
    incompleteMentoringCount = 0,
    incompleteEvaluation360Count = null,
    incompleteReferencesCount = 0,
}: EvaluationHeaderProps) {
    const pageHeaderSections: PageHeaderSection<SectionType>[] = sections.map(
        section => {
            if (section === 'Autoavaliação') {
                return {
                    name: section,
                    showBadge: incompleteSelfAssessmentCount > 0,
                    badgeCount: incompleteSelfAssessmentCount,
                };
            }
            if (section === 'Mentoring') {
                return {
                    name: section,
                    showBadge: incompleteMentoringCount > 0,
                    badgeCount: incompleteMentoringCount,
                };
            }
            if (section === 'Avaliação 360') {
                return {
                    name: section,
                    showBadge:
                        incompleteEvaluation360Count === null ||
                        incompleteEvaluation360Count > 0,
                    badgeCount:
                        incompleteEvaluation360Count === null
                            ? undefined
                            : incompleteEvaluation360Count,
                };
            }
            if (section === 'Referências') {
                return {
                    name: section,
                    showBadge: incompleteReferencesCount > 0,
                    badgeCount: incompleteReferencesCount,
                };
            }
            return { name: section };
        },
    );

    return (
        <PageHeader
            title="Ciclo 2025.1"
            button={<EvaluationSubmitButton />}
            sections={pageHeaderSections}
            activeSection={activeSection}
            onSectionChange={onSectionChange}
        />
    );
}

export const EvaluationHeader = memo(EvaluationHeaderComponent);
