import { EvaluationHeader } from './EvaluationHeader';

import { useSectionNavigation } from '../../hooks/useSectionNavigation';
import { useEvaluationCompletion } from '../../hooks/useEvaluationCompletion';

import { SectionRenderer } from './Sections/SectionRenderer';
import { evaluationSections, type SectionType } from './Sections/EvaluationSections';

export function EvaluationForm() {

    const { activeSection, navigateToSection, sections } = useSectionNavigation<SectionType>(evaluationSections);
    
    const incompleteFields = useEvaluationCompletion();

    return (
        <>
            <EvaluationHeader
                activeSection={activeSection}
                onSectionChange={navigateToSection}
                sections={sections}
                incompleteSelfAssessmentCount={incompleteFields.incompleteSelfAssessmentCount}
                incompleteMentoringCount={incompleteFields.incompleteMentoringCount}
                incompleteEvaluation360Count={incompleteFields.incompleteEvaluation360Count}
                incompleteReferencesCount={incompleteFields.incompleteReferencesCount}
            />
            <main className="p-8 pt-6">
                <SectionRenderer activeSection={activeSection} />
            </main>
        </>
    );
}
