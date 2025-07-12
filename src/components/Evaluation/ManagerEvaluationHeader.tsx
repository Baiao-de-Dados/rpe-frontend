import { memo } from 'react';

import Typography from '../common/Typography';
import CollaboratorCard from '../common/CollaboratorCard';
import PageHeader from '../common/PageHeader';

import ManagerEvaluationSubmitButton from './ManagerEvaluationSubmitButton';

import type { ManagerSectionType } from './SectionsMentor/ManagerEvaluationSections';
import type { PageHeaderSection } from '../common/PageHeader';

interface ManagerEvaluationHeaderProps {
    activeSection: ManagerSectionType;
    onSectionChange: (section: ManagerSectionType) => void;
    sections: ManagerSectionType[];
    collaborator: {
        id: number;
        nome: string;
        cargo: string;
        image?: string;
        avatar?: string;
    };
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
            if (section === 'Autoavaliação') {
                return {
                    name: section,
                    showBadge: incompleteSelfAssessmentCount > 0,
                    badgeCount: incompleteSelfAssessmentCount,
                };
            }
            return { name: section };
        },
    );

    // Conteúdo customizado para o título
    const titleContent = (
        <div className="flex items-center gap-2 lg:gap-4">
            <CollaboratorCard 
                collaborator={collaborator} 
                variant="detailed" 
                className="flex-shrink-0"
            />
            {/* Separador e ciclo - apenas em desktop */}
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