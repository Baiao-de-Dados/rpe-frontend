import { memo } from 'react';
import { BadgeCheck } from 'lucide-react';

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
    isEqualizationComplete?: boolean;
    isSubmitting?: boolean;
    onSaveEqualization?: () => void;
}

const CommitteeEvaluationHeader = memo(({
    activeSection,
    onSectionChange,
    sections,
    collaborator,
    cycleName,
    isEqualizationComplete,
    isSubmitting,
    onSaveEqualization,
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

    const button = activeSection === 'Equalização' ? (
        <button
            className="bg-[#167174] hover:bg-[#125c5e] text-white px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={onSaveEqualization}
            disabled={isSubmitting || !isEqualizationComplete}
        >
            <BadgeCheck className="w-5 h-5" />
            {isSubmitting ? 'Salvando...' : 'Salvar Equalização'}
        </button>
    ) : undefined;

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
