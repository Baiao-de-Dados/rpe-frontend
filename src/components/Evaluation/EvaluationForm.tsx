import { SectionRenderer } from './SectionRenderer';
import { EvaluationHeader } from './EvaluationHeader';

import { useSectionNavigation } from '../../hooks/useSectionNavigation';

export function EvaluationForm() {
    const { activeSection, navigateToSection, sections } =
        useSectionNavigation();

    return (
        <>
            <EvaluationHeader
                activeSection={activeSection}
                onSectionChange={navigateToSection}
                sections={sections}
            />
            <main className="p-8 pt-6">
                <SectionRenderer activeSection={activeSection} />
            </main>
        </>
    );
}
