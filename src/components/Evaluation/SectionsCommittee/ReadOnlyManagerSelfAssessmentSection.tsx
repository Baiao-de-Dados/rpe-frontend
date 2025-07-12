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
}

export const ReadOnlyManagerSelfAssessmentSection = memo(({ 
    collaboratorSelfAssessment = []
}: ReadOnlyManagerSelfAssessmentSectionProps) => {

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
        
        return fields.map((_, index) => ({
            id: index,
            pilarId: allCriteria[index]?.pilarId || 0,
            criterionId: allCriteria[index]?.criterionId || 0,
            index: index,
        }));
    }, [fields]);

    // Função para obter dados do colaborador por pilar
    const getCollaboratorDataByPillar = (pillarId: number) => {
        return collaboratorSelfAssessment.filter((data: { pilarId: number }) => data.pilarId === pillarId);
    };

    return (
        <section>
            <div className="space-y-8">
                {Object.values(mockEvaluationPillars).map(pillar => (
                    <ReadOnlyManagerPillarSection
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
