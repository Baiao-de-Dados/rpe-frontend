import { memo } from 'react';

import Typography from '../common/Typography';
import CollaboratorCard from '../common/CollaboratorCard';
import PageHeader from '../common/PageHeader';

import MentorEvaluationSubmitButton from './MentorEvaluationSubmitButton';

import type { MentorSectionType } from './SectionsMentor/MentorEvaluationSections';
import type { PageHeaderSection } from '../common/PageHeader';

interface MentorEvaluationHeaderProps {
    activeSection: MentorSectionType;
    onSectionChange: (section: MentorSectionType) => void;
    sections: MentorSectionType[];
    collaborator: {
        id: string;
        nome: string;
        cargo: string;
        image?: string;
        avatar?: string;
    };
    cycleName: string;
    incompleteSelfAssessmentCount?: number;
    incompleteGeneralAssessmentCount?: number;
}

const MentorEvaluationHeader = memo(({
    activeSection,
    onSectionChange,
    sections,
    collaborator,
    cycleName,
    incompleteSelfAssessmentCount = 0,
    incompleteGeneralAssessmentCount = 0,
}: MentorEvaluationHeaderProps) => {

    const pageHeaderSections: PageHeaderSection<MentorSectionType>[] = sections.map(
        section => {
            if (section === 'Autoavaliação') {
                return {
                    name: section,
                    showBadge: incompleteSelfAssessmentCount > 0,
                    badgeCount: incompleteSelfAssessmentCount,
                };
            }
            if (section === 'Avaliação Geral') {
                return {
                    name: section,
                    showBadge: incompleteGeneralAssessmentCount > 0,
                    badgeCount: incompleteGeneralAssessmentCount,
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
            button={<MentorEvaluationSubmitButton />}
            sections={pageHeaderSections}
            activeSection={activeSection}
            onSectionChange={onSectionChange}
        />
    );
});

export default MentorEvaluationHeader;