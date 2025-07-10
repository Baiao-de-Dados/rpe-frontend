import { useState } from 'react';

import { AllEvaluationHeader } from "./AllEvaluationHeader";

import mockEvaluations, { type Cycle } from '../../../data/mockEvaluations';

import { useSectionNavigation } from "../../../hooks/useSectionNavigation";

import { SectionRenderer } from "./Sections/SectionRenderer";
import { evaluationSections, type SectionType } from "./Sections/EvaluationSections";

const AllEvaluation = () => {

    const { activeSection, navigateToSection, sections } = useSectionNavigation<SectionType>(evaluationSections);

    const cycles = mockEvaluations.cycles.map((c: Cycle) => c.cycleName);

    const [selectedCycle, setSelectedCycle] = useState(cycles[cycles.length - 1] || cycles[0] || '');

    return (
        <>
            <AllEvaluationHeader
                activeSection={activeSection}
                onSectionChange={navigateToSection}
                sections={sections}
                cycles={cycles}
                selectedCycle={selectedCycle}
                onSelectCycle={setSelectedCycle}
            />
            <main className="p-8 pt-6">
                <SectionRenderer activeSection={activeSection} selectedCycle={selectedCycle} />
            </main>
        </>
    );
};

export default AllEvaluation;
