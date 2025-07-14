import { memo } from 'react';

import type { Collaborator } from '../../types/collaborator';

import Typography from '../common/Typography';
import PageHeader from '../common/PageHeader';
import CollaboratorCard from '../common/CollaboratorCard';
import type { PageHeaderSection } from '../common/PageHeader';

import { type CommitteeSectionType } from './SectionsCommittee/CommitteeEvaluationSections';

interface CommitteeEvaluationHeaderProps {
    activeSection: CommitteeSectionType;
    onSectionChange: (section: CommitteeSectionType) => void;
    sections: CommitteeSectionType[];
    collaborator: Collaborator;
    cycleName: string;
}

const CommitteeEvaluationHeader = memo(({
    activeSection,
    onSectionChange,
    sections,
    collaborator,
    cycleName,
}: CommitteeEvaluationHeaderProps) => {

    const pageHeaderSections: PageHeaderSection<CommitteeSectionType>[] = sections.map(section => ({ name: section }));


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

    // Remover o botão global de salvar equalização
    const button = undefined;

    return (
        <PageHeader
            titleContent={titleContent}
            button={button}
            sections={pageHeaderSections}
            activeSection={activeSection}
            onSectionChange={onSectionChange}
        />
    );
});

export default CommitteeEvaluationHeader;
