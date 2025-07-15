import { useEffect, useMemo, memo, useRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { ReadOnlyManagerPillarSection } from './ReadOnlyManagerPillarSection';

import type { FullManagerEvaluationFormData } from '../../../schemas/managerEvaluation';

import { mockEvaluationPillars, type Criterion } from '../../../data/mockEvaluationPIllars';

interface ReadOnlyManagerSelfAssessmentSectionProps {
    // Dados da autoavaliação do colaborador (read-only)
    collaboratorSelfAssessment?: Array<{
        pilarId: number;
        criterionId: number;
        rating?: number | null;
        justification?: string;
    }>;
    // Dados da avaliação do gestor (read-only)
    managerEvaluationData?: Array<{
        pilarId: number;
        criterionId: number;
        rating?: number | null;
        justification?: string;
    }>;
    // Critérios reais da trilha (opcional)
    allCriteria?: Array<{
        id: number;
        nome: string;
        descricao: string;
        pilarId: number;
        pilarNome: string;
    }>;
}

export const ReadOnlyManagerSelfAssessmentSection = memo(({ 
    collaboratorSelfAssessment = [],
    managerEvaluationData = [],
    allCriteria
}: ReadOnlyManagerSelfAssessmentSectionProps) => {

    const { control } = useFormContext<FullManagerEvaluationFormData>();
    const isInitialized = useRef(false);

    const { fields, replace } = useFieldArray({
        control,
        name: 'managerAssessment',
    });

    // Usar critérios reais se disponíveis, senão usar mock
    const criteriaToUse = allCriteria || Object.values(mockEvaluationPillars).flatMap(pillar =>
        pillar.criterios.map((criterion: Criterion) => ({
            id: criterion.id,
            nome: criterion.nome,
            descricao: criterion.descricao,
            pilarId: pillar.id,
            pilarNome: pillar.titulo,
        }))
    );

    useEffect(() => {
        const allCriteriaForForm = criteriaToUse.map(criterion => ({
            pilarId: criterion.pilarId,
            criterionId: criterion.id,
            rating: null,
            justification: '',
        }));
        
        if ((!fields || fields.length !== allCriteriaForForm.length) && !isInitialized.current) {
            replace(allCriteriaForForm);
            isInitialized.current = true;
        }
    }, [fields, replace, criteriaToUse]);

    const validFields = useMemo(() => {
        return fields.map((_, index) => ({
            id: index,
            pilarId: criteriaToUse[index]?.pilarId || 0,
            criterionId: criteriaToUse[index]?.id || 0,
            index: index,
        }));
    }, [fields, criteriaToUse]);

    // Função para obter dados do colaborador por pilar
    const getCollaboratorDataByPillar = (pillarId: number) => {
        return collaboratorSelfAssessment.filter((data: { pilarId: number }) => data.pilarId === pillarId);
    };

    // Função para obter dados do gestor por pilar
    const getManagerDataByPillar = (pillarId: number) => {
        return managerEvaluationData.filter((data: { pilarId: number }) => data.pilarId === pillarId);
    };

    // Agrupar critérios por pilar
    const criteriaByPillar = useMemo(() => {
        const grouped: Record<string, Array<{
            id: number;
            nome: string;
            descricao: string;
            pilarId: number;
            pilarNome: string;
        }>> = {};
        
        criteriaToUse.forEach(criterion => {
            const pillarKey = `${criterion.pilarId}-${criterion.pilarNome}`;
            if (!grouped[pillarKey]) {
                grouped[pillarKey] = [];
            }
            grouped[pillarKey].push(criterion);
        });
        
        return grouped;
    }, [criteriaToUse]);

    return (
        <section>
            <div className="space-y-8">
                {Object.entries(criteriaByPillar).map(([pillarKey, criteria]) => {
                    const [pillarId, pillarName] = pillarKey.split('-');
                    
                    return (
                        <ReadOnlyManagerPillarSection
                            key={pillarKey}
                            pillarTitle={pillarName}
                            criteria={criteria}
                            validFields={validFields}
                            collaboratorData={getCollaboratorDataByPillar(Number(pillarId))}
                            managerData={getManagerDataByPillar(Number(pillarId))}
                        />
                    );
                })}
            </div>
        </section>
    );
});
