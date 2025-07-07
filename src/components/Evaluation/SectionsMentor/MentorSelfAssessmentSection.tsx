import { useEffect, useMemo, memo, useRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { MentorPillarSection } from '../MentorPillarSection';

import type { FullMentorEvaluationFormData } from '../../../schemas/mentorEvaluation';

import { mockEvaluationPillars, type Criterion } from '../../../data/mockEvaluationPIllars';

interface MentorSelfAssessmentSectionProps {
    // Dados da autoavaliação do colaborador (read-only)
    collaboratorSelfAssessment?: Array<{
        pilarId: string;
        criterionId: string;
        rating?: number | null;
        justification?: string;
    }>;
}

export const MentorSelfAssessmentSection = memo(({ 
    collaboratorSelfAssessment = [] 
}: MentorSelfAssessmentSectionProps) => {

    const { control } = useFormContext<FullMentorEvaluationFormData>();
    const isInitialized = useRef(false);

    const { fields, replace } = useFieldArray({
        control,
        name: 'mentorAssessment',
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

    const validFields = useMemo(() =>
        fields.map((field, index) => ({
            id: field.id,
            pilarId: field.pilarId,
            criterionId: field.criterionId,
            index: index,
        })),
        [fields],
    );

    // Função para obter dados do colaborador por pilar
    const getCollaboratorDataByPillar = (pillarId: string) => {
        return collaboratorSelfAssessment.filter(data => data.pilarId === pillarId);
    };

    return (
        <section>
            <div className="space-y-8">
                {Object.values(mockEvaluationPillars).map(pillar => (
                    <MentorPillarSection
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
