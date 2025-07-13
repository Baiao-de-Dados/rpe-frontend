import { memo } from 'react';

import Typography from '../common/Typography';
import PageHeader from '../common/PageHeader';
import CollaboratorCard from '../common/CollaboratorCard';

import type { Collaborator } from '../../types/collaborator';
import type { PageHeaderSection } from '../common/PageHeader';

import ManagerEvaluationSubmitButton from './ManagerEvaluationSubmitButton';

import type { ManagerSectionType } from './SectionsMentor/ManagerEvaluationSections';

interface ManagerEvaluationHeaderProps {
    activeSection: ManagerSectionType;
    onSectionChange: (section: ManagerSectionType) => void;
    sections: ManagerSectionType[];
    collaborator: Collaborator;
    cycleName: string;
    incompleteSelfAssessmentCount?: number;
}

const ManagerEvaluationHeader = memo(({
    activeSection,
    onSectionChange,
    sections,
    collaborator,
    cycleName,
    incompleteSelfAssessmentCount = 0,
}: ManagerEvaluationHeaderProps) => {

    const pageHeaderSections: PageHeaderSection<ManagerSectionType>[] = sections.map(
        section => {
            if (section === 'Avaliação') {
                return {
                    name: section,
                    showBadge: incompleteSelfAssessmentCount > 0,
                    badgeCount: incompleteSelfAssessmentCount,
                };
            }
            return { name: section };
        },
    );

    const titleContent = (
        <div className="flex items-center gap-2 lg:gap-4">
            <CollaboratorCard 
                collaborator={collaborator} 
                variant="detailed" 
                className="flex-shrink-0"
            />
            <div className="hidden lg:flex items-center">
                <div className="h-8 w-px bg-gray-300 mx-4"></div>
                <Typography
                    variant="body"
                    color="muted"
                    className="text-sm"
                >
                    {cycleName}
                </Typography>
            </div>
        </div>
    );

    return (
        <PageHeader
            titleContent={titleContent}
            button={<ManagerEvaluationSubmitButton />}
            sections={pageHeaderSections}
            activeSection={activeSection}
            onSectionChange={onSectionChange}
        />
    );
});

export default ManagerEvaluationHeader;