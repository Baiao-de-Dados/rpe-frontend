import { memo } from 'react';
import PageHeader from '../common/PageHeader';
import type { PageHeaderSection } from '../common/PageHeader';
import type { SectionType } from './Sections/CriterionSections';
import CriteriosSubmitButton from './CriteriosSubmitButton';
import { useCycle } from '../../hooks/useCycle';

interface CriterionHeaderProps {
    activeSection: SectionType;
    onSectionChange: (section: SectionType) => void;
    sections: SectionType[];
}

function CriterionHeaderComponent({
    activeSection,
    onSectionChange,
    sections,
}: CriterionHeaderProps) {
    const { currentCycle } = useCycle();

    const isCycleClosed = !currentCycle?.isOpen;

    const pageHeaderSections: PageHeaderSection<SectionType>[] = sections.map(
        section => {
            if (section === 'Pilares') {
                return {
                    name: section,
                };
            }
            if (section === 'Trilhas') {
                return {
                    name: section,
                };
            }
            if (section === 'Ciclo') {
                return {
                    name: section,
                };
            }
            return { name: section };
        },
    );

    return (
        <PageHeader
            title="Ciclo 2025.1"
            button={<CriteriosSubmitButton isCycleClosed={isCycleClosed} />}
            sections={pageHeaderSections}
            activeSection={activeSection}
            onSectionChange={onSectionChange}
        />
    );
}

export const CriterionHeader = memo(CriterionHeaderComponent);
