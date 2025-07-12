import { memo } from 'react';

import Typography from '../common/Typography';
import CollaboratorCard from '../common/CollaboratorCard';
import PageHeader from '../common/PageHeader';

import LeaderEvaluationSubmitButton from './LeaderEvaluationSubmitButton';

import type { LeaderSectionType } from './SectionsLeader/LeaderEvaluationSections';
import type { PageHeaderSection } from '../common/PageHeader';

interface LeaderEvaluationHeaderProps {
    activeSection: LeaderSectionType;
    onSectionChange: (section: LeaderSectionType) => void;
    sections: LeaderSectionType[];
    collaborator: {
        id: number;
        nome: string;
        cargo: string;
        image?: string;
        avatar?: string;
    };
    cycleName: string;
    incompleteAssessmentCount?: number;
}

const LeaderEvaluationHeader = memo(({
    activeSection,
    onSectionChange,
    sections,
    collaborator,
    cycleName,
    incompleteAssessmentCount = 0,
}: LeaderEvaluationHeaderProps) => {

    const pageHeaderSections: PageHeaderSection<LeaderSectionType>[] = sections.map(
        section => {
            if (section === 'Avaliação Geral') {
                return {
                    name: section,
                    showBadge: incompleteAssessmentCount > 0,
                    badgeCount: incompleteAssessmentCount,
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
            button={<LeaderEvaluationSubmitButton />}
            sections={pageHeaderSections}
            activeSection={activeSection}
            onSectionChange={onSectionChange}
        />
    );
});

export default LeaderEvaluationHeader;
