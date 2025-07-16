import { useState } from 'react';

import { AllEvaluationHeader } from "./AllEvaluationHeader";

import { useAllEvaluationQuery } from '../../../hooks/api/useCollaboratorQuery';
import type { EvaluationCycle } from '../../../types/evaluations';

import { useSectionNavigation } from "../../../hooks/useSectionNavigation";

import { SectionRenderer } from "./Sections/SectionRenderer";
import { evaluationSections, type SectionType } from "./Sections/EvaluationSections";
import { Loader2 } from 'lucide-react';

const AllEvaluation = () => {

    const { activeSection, navigateToSection, sections } = useSectionNavigation<SectionType>(evaluationSections);

    const { data, isLoading } = useAllEvaluationQuery();
    const cycles = data?.cycles?.map((c: EvaluationCycle) => c.cycleName) || [];
    const [selectedCycle, setSelectedCycle] = useState(() => cycles[cycles.length - 1] || cycles[0] || '');

    if (cycles.length > 0 && !cycles.includes(selectedCycle)) {
        setSelectedCycle(cycles[cycles.length - 1]);
    }

    if (isLoading) {
        return <div className="flex items-center justify-center">
                    <Loader2 className="h-10 w-10 animate-spin text-primary-500" />
                </div>;
    }

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
