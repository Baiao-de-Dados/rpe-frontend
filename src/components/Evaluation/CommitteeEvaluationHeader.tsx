import { memo } from 'react';
import { BadgeCheck } from 'lucide-react';
import { type CommitteeSectionType } from './SectionsCommittee/CommitteeEvaluationSections';

import Typography from '../common/Typography';
import CollaboratorCard from '../common/CollaboratorCard';
import PageHeader from '../common/PageHeader';
import type { PageHeaderSection } from '../common/PageHeader';

interface CommitteeEvaluationHeaderProps {
    activeSection: CommitteeSectionType;
    onSectionChange: (section: CommitteeSectionType) => void;
    sections: CommitteeSectionType[];
    collaborator: {
        id: number;
        nome: string;
        cargo: string;
        image?: string;
        avatar?: string;
    };
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
    // Seções para o PageHeader
    const pageHeaderSections: PageHeaderSection<CommitteeSectionType>[] = sections.map(section => ({ name: section }));

    // Conteúdo customizado para o título (igual ao Manager)
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

    // Botão de submissão só na seção equalização
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
