import { memo } from 'react';

import type { SectionType } from './Sections/EvaluationSections';

import PageHeader from '../../common/PageHeader';
import type { PageHeaderSection } from '../../common/PageHeader';
import CycleDropdownButton from './CycleDropdownButton';

interface AllEvaluationHeaderProps {
    activeSection: SectionType;
    onSectionChange: (section: SectionType) => void;
    sections: SectionType[];
    cycles: string[];
    selectedCycle: string;
    onSelectCycle: (cycle: string) => void;
}

function AllEvaluationHeaderComponent({ activeSection, onSectionChange, sections, cycles, selectedCycle, onSelectCycle }: AllEvaluationHeaderProps) {

    const pageHeaderSections: PageHeaderSection<SectionType>[] = sections.map(
        section => ({ name: section }),
    );

    return (
        <PageHeader
            title={`Ciclo ${selectedCycle}`}
            button={<CycleDropdownButton cycles={cycles} selectedCycle={selectedCycle} onSelect={onSelectCycle} />}
            sections={pageHeaderSections}
            activeSection={activeSection}
            onSectionChange={onSectionChange}
        />
    );
}

export const AllEvaluationHeader = memo(AllEvaluationHeaderComponent);
