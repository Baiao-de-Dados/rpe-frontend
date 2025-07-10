import { useEffect, useMemo, memo, useRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { ManagerPillarSection } from '../ManagerPillarSection';

import type { FullManagerEvaluationFormData } from '../../../schemas/managerEvaluation';

import { mockEvaluationPillars, type Criterion } from '../../../data/mockEvaluationPIllars';

interface ManagerSelfAssessmentSectionProps {
    // Dados da autoavaliação do colaborador (read-only)
    collaboratorSelfAssessment?: Array<{
        pilarId: string;
        criterionId: string;
        rating?: number | null;
        justification?: string;
    }>;
}

export const ManagerSelfAssessmentSection = memo(({ 
    collaboratorSelfAssessment = [] 
}: ManagerSelfAssessmentSectionProps) => {

    const { control } = useFormContext<FullManagerEvaluationFormData>();
    const isInitialized = useRef(false);

    const { fields, replace } = useFieldArray({
        control,
        name: 'managerAssessment',
    });

    useEffect(() => {
        const allCriteria = Object.values(mockEvaluationPillars).flatMap(pillar =>
                pillar.criterios.map((criterion: Criterion) => ({
                    pilarId: pillar.id,
                    criterionId: criterion.id,
                    rating: null,
                    justification: '',
                })),
        );
        if ((!fields || fields.length !== allCriteria.length) && !isInitialized.current) {
            replace(allCriteria);
            isInitialized.current = true;
        }
    }, [fields, replace]);

    const validFields = useMemo(() => {
        const allCriteria = Object.values(mockEvaluationPillars).flatMap(pillar =>
            pillar.criterios.map((criterion: Criterion) => ({
                pilarId: pillar.id,
                criterionId: criterion.id,
            }))
        );
        
        return fields.map((field, index) => ({
            id: field.id,
            pilarId: allCriteria[index]?.pilarId || '',
            criterionId: allCriteria[index]?.criterionId || '',
            index: index,
        }));
    }, [fields]);

    // Função para obter dados do colaborador por pilar
    const getCollaboratorDataByPillar = (pillarId: string) => {
        return collaboratorSelfAssessment.filter((data: { pilarId: string }) => data.pilarId === pillarId);
    };

    return (
        <section>
            <div className="space-y-8">
                {Object.values(mockEvaluationPillars).map(pillar => (
                    <ManagerPillarSection
                        key={pillar.titulo}
                        pillarTitle={pillar.titulo}
                        criteria={pillar.criterios}
                        validFields={validFields}
                        collaboratorData={getCollaboratorDataByPillar(pillar.id)}
                    />
                ))}
            </div>
        </section>
    );
});
