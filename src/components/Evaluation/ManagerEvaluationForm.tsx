import { useMemo, memo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import type { Collaborator } from '../../types/collaborator';

import ManagerEvaluationHeader from './ManagerEvaluationHeader';

import { useSectionNavigation } from '../../hooks/useSectionNavigation';
import { useTrackCriteria } from '../../hooks/api/useManagerQuery';

import type { FullManagerEvaluationFormData } from '../../schemas/managerEvaluation';

import { ManagerSectionRenderer } from './SectionsMentor/ManagerSectionRenderer';
import { managerEvaluationSections, type ManagerSectionType } from './SectionsMentor/ManagerEvaluationSections';

interface ManagerEvaluationFormProps {
    collaborator: Collaborator;
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

    // Buscar critérios da trilha do colaborador
    const { data: trackCriteria } = useTrackCriteria();

    const allCriteria = useMemo(() => {
        if (!trackCriteria || !collaborator.track) {
            return [];
        }

        // Encontrar a trilha do colaborador
        const collaboratorTrack = trackCriteria.find(track => track.id === collaborator.track.id);
        if (!collaboratorTrack?.pillars) {
            return [];
        }

        // Extrair todos os critérios dos pilares da trilha
        return collaboratorTrack.pillars.flatMap(pillar => 
            pillar.criteria.map(criterion => ({
                id: criterion.id,
                nome: criterion.name,
                pilarId: pillar.id,
                pilarNome: pillar.name,
                weight: criterion.weight, // Incluir peso do critério
            }))
        );
    }, [trackCriteria, collaborator.track]);

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

            // const hasJustification = assessment?.justification && typeof assessment.justification === 'string' && 
            // assessment.justification.trim().length > 0; // Removido

            if (!hasRating) { // Removida exigência de justificativa
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
                    allCriteria={allCriteria}
                />
            </main>
        </>
    );
});
