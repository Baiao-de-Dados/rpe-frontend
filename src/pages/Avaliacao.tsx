import { useEvaluationForm } from '../hooks/useEvaluationForm';

import { EvaluationForm } from '../components/Evaluation/EvaluationForm';
import { EvaluationHeader } from '../components/Evaluation/EvaluationHeader';

export function Avaliacao() {
    const evaluationForm = useEvaluationForm();

    return (
        <>
            <EvaluationHeader
                activeSection={evaluationForm.activeSection}
                isFormComplete={evaluationForm.isFormComplete}
                onNavClick={evaluationForm.handleNavClick}
                getNotification={evaluationForm.getNotification}
            />
            <main className="p-8 pt-6">
                <EvaluationForm {...evaluationForm.formProps} />
            </main>
        </>
    );
}
