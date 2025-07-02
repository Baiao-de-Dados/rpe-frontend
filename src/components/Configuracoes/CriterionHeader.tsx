import { memo } from 'react';
import PageHeader from '../common/PageHeader';
import type { PageHeaderSection } from '../common/PageHeader';
import type { SectionType } from './Sections/CriterionSections';

interface CriterionHeaderProps {
    activeSection: SectionType;
    onSectionChange: (section: SectionType) => void;
    sections: SectionType[];
}

function CriterionHeaderComponent({ activeSection, onSectionChange, sections }: CriterionHeaderProps) {
    const pageHeaderSections: PageHeaderSection<SectionType>[] = sections.map(section => ({ name: section }));

    return <PageHeader title="Configurações de Ciclo" sections={pageHeaderSections} activeSection={activeSection} onSectionChange={onSectionChange} />;
}

export const CriterionHeader = memo(CriterionHeaderComponent);
