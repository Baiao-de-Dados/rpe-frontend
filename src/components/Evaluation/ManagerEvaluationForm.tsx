import { useMemo, memo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import ManagerEvaluationHeader from './ManagerEvaluationHeader';
import { ManagerSectionRenderer } from './SectionsMentor/ManagerSectionRenderer';
import { managerEvaluationSections, type ManagerSectionType } from './SectionsMentor/ManagerEvaluationSections';

import { useSectionNavigation } from '../../hooks/useSectionNavigation';

import type { FullManagerEvaluationFormData } from '../../schemas/managerEvaluation';
import { mockEvaluationPillars } from '../../data/mockEvaluationPIllars';

interface ManagerEvaluationFormProps {
    collaborator: {
        id: number;
        nome: string;
        cargo: string;
        image?: string;
        avatar?: string;
    };
    cycleName: string;
    // Dados da autoavaliação do colaborador (read-only)
    collaboratorSelfAssessment?: Array<{
        pilarId: number;
        criterionId: number;
        rating?: number | null;
        justification?: string;
    }>;
    // Dados das avaliações 360° recebidas
    evaluations360?: Array<{
        collaratorName: string;
        collaboratorPosition: string;
        rating: number;
        improvements: string;
        strengths: string;
    }>;
    // Dados das referências recebidas
    referencesReceived?: Array<{
        collaratorName: string;
        collaboratorPosition: string;
        justification: string;
    }>;
}

export const ManagerEvaluationForm = memo(({
    collaborator,
    cycleName,
    collaboratorSelfAssessment,
    evaluations360,
    referencesReceived
}: ManagerEvaluationFormProps) => {

    const { activeSection, navigateToSection, sections } =
        useSectionNavigation<ManagerSectionType>([...managerEvaluationSections]);

    const { control } = useFormContext<FullManagerEvaluationFormData>();

    const allCriteria = useMemo(() => {
        return [
            ...mockEvaluationPillars.comportamento.criterios,
            ...mockEvaluationPillars.execucao.criterios,
            ...mockEvaluationPillars.gestaoLideranca.criterios,
        ];
    }, []);

    const watchedManagerAssessment = useWatch({
        control,
        name: 'managerAssessment',
    });

    const incompleteSelfAssessmentCount = useMemo(() => {
        if (!watchedManagerAssessment || !Array.isArray(watchedManagerAssessment)) {
            return allCriteria.length;
        }

        let incompleteCount = 0;

        for (let i = 0; i < allCriteria.length; i++) {
            const assessment = watchedManagerAssessment[i];

            const hasRating = assessment?.rating && typeof assessment.rating === 'number' && assessment.rating > 0;

            const hasJustification = assessment?.justification && typeof assessment.justification === 'string' && 
            assessment.justification.trim().length > 0;

            if (!hasRating || !hasJustification) {
                incompleteCount++;
            }
        }

        return incompleteCount;
    }, [watchedManagerAssessment, allCriteria.length]);

    return (
        <>
            <ManagerEvaluationHeader
                activeSection={activeSection}
                onSectionChange={navigateToSection}
                sections={sections}
                collaborator={collaborator}
                cycleName={cycleName}
                incompleteSelfAssessmentCount={incompleteSelfAssessmentCount}
            />
            
            <main className="p-8 pt-6">
                <ManagerSectionRenderer 
                    activeSection={activeSection}
                    collaborator={collaborator}
                    collaboratorSelfAssessment={collaboratorSelfAssessment}
                    evaluations360={evaluations360}
                    referencesReceived={referencesReceived}
                    cycleName={cycleName}
                />
            </main>
        </>
    );
});
