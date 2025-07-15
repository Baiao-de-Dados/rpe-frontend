import { useEffect, useMemo, memo, useRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { ManagerPillarSection } from '../ManagerPillarSection';

import type { FullManagerEvaluationFormData } from '../../../schemas/managerEvaluation';

interface ManagerSelfAssessmentSectionProps {
    // Dados da autoavaliação do colaborador (read-only)
    collaboratorSelfAssessment?: Array<{
        pilarId: number;
        criterionId: number;
        rating?: number | null;
        justification?: string;
    }>;
    // Critérios da trilha do colaborador
    allCriteria?: Array<{
        id: number;
        nome: string;
        pilarId: number;
        pilarNome: string;
        weight?: number;
    }>;
    // Modo somente leitura (quando avaliação já foi enviada)
    isReadOnly?: boolean;
    // Dados da avaliação do manager (para modo read-only)
    managerEvaluationData?: Array<{
        pilarId: number;
        criterionId: number;
        rating?: number | null;
        justification?: string;
    }>;
}

export const ManagerSelfAssessmentSection = memo(({ 
    collaboratorSelfAssessment = [],
    allCriteria = [],
    isReadOnly = false,
    managerEvaluationData = []
}: ManagerSelfAssessmentSectionProps) => {

    console.log('ManagerSelfAssessmentSection debug:', {
        collaboratorSelfAssessment,
        allCriteria,
        allCriteriaLength: allCriteria.length
    });

    const { control } = useFormContext<FullManagerEvaluationFormData>();
    const isInitialized = useRef(false);

    const { fields, replace } = useFieldArray({
        control,
        name: 'managerAssessment',
    });

    useEffect(() => {
        const criteriaForForm = allCriteria.map(criterion => ({
            pilarId: criterion.pilarId,
            criterionId: criterion.id,
            rating: null,
            justification: '',
        }));
        
        if ((!fields || fields.length !== criteriaForForm.length) && !isInitialized.current && allCriteria.length > 0) {
            replace(criteriaForForm);
            isInitialized.current = true;
        }
    }, [fields, replace, allCriteria]);

    const validFields = useMemo(() => {
        return fields.map((_, index) => ({
            id: index,
            pilarId: allCriteria[index]?.pilarId || 0,
            criterionId: allCriteria[index]?.id || 0,
            index: index,
        }));
    }, [fields, allCriteria]);

    // Agrupar critérios por pilar
    const criteriaByPillar = useMemo(() => {
        const grouped: Record<string, Array<{
            id: number;
            nome: string;
            pilarId: number;
            pilarNome: string;
            weight?: number; // Adicionar peso
        }>> = {};
        
        allCriteria.forEach(criterion => {
            const pillarKey = `${criterion.pilarId}-${criterion.pilarNome}`;
            if (!grouped[pillarKey]) {
                grouped[pillarKey] = [];
            }
            grouped[pillarKey].push(criterion);
        });
        
        return grouped;
    }, [allCriteria]);

    // Função para obter dados do colaborador por pilar
    const getCollaboratorDataByPillar = (pillarId: number) => {
        return collaboratorSelfAssessment.filter((data: { pilarId: number }) => data.pilarId === pillarId);
    };

    return (
        <section>
            <div className="space-y-8">
                {Object.entries(criteriaByPillar).map(([pillarKey, criteria]) => {
                    const [pillarId, pillarName] = pillarKey.split('-');
                    return (
                        <ManagerPillarSection
                            key={pillarKey}
                            pillarTitle={pillarName}
                            criteria={criteria.map(c => ({ 
                                id: c.id, 
                                nome: c.nome,
                                descricao: c.nome, // TODO: Obter descrição real da API
                                weight: c.weight
                            }))}
                            validFields={validFields}
                            collaboratorData={getCollaboratorDataByPillar(Number(pillarId))}
                            isReadOnly={isReadOnly}
                            managerEvaluationData={managerEvaluationData}
                        />
                    );
                })}
            </div>
        </section>
    );
});
