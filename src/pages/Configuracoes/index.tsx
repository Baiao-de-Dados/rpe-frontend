import { useCycle } from '../../hooks/useCycle';
import { useSectionNavigation } from '../../hooks/useSectionNavigation';

import CycleLoading from '../../components/common/CycleLoading';
import { ConfigHeader } from '../../components/Configuracoes/ConfigHeader';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import { SectionRenderer } from '../../components/Configuracoes/Sections/SectionRenderer';
import type { SectionType } from '../../components/Configuracoes/Sections/CriterionSections';
import { criterionSections } from '../../components/Configuracoes/Sections/CriterionSections';

export function Configuracoes() {

    const { currentCycle, isLoading } = useCycle();

    const { activeSection, navigateToSection } = useSectionNavigation<SectionType>(criterionSections);

    if (isLoading) {
        return <CycleLoading />;
    }

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
    }

    return (
        <>
            <ConfigHeader activeSection={activeSection} onSectionChange={navigateToSection} sections={criterionSections} />
            <main className="pt-6 p-8">
                <SectionRenderer activeSection={activeSection} />
            </main>
        </>
    );

}
