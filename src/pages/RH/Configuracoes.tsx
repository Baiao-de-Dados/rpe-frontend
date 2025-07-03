import { useCycle } from '../../hooks/useCycle';
import CycleLoading from '../../components/common/CycleLoading';
import { SectionRenderer } from '../../components/Configuracoes/Sections/SectionRenderer';
import type { SectionType } from '../../components/Configuracoes/Sections/CriterionSections';
import { useSectionNavigation } from '../../hooks/useSectionNavigation';
import { criterionSections } from '../../components/Configuracoes/Sections/CriterionSections';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import { CriterionHeader } from '../../components/Configuracoes/CriterionHeader';

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
            <CriterionHeader activeSection={activeSection} onSectionChange={navigateToSection} sections={criterionSections} />
            <main className="pt-6 px-2 sm:p-8">
                <SectionRenderer activeSection={activeSection} />
            </main>
        </>
    );
}
