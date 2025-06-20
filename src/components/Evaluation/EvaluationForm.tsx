import { MentoringSection } from './Sections/MentoringSection';
import { ReferencesSection } from './Sections/ReferencesSection';
import { Evaluation360Section } from './Sections/Evaluation360Section';

export function EvaluationForm() {
    return (
        <>
            <Evaluation360Section />
            <br />
            <br />
            <ReferencesSection />
            <br />
            <br />
            <MentoringSection />
        </>
    );
}
