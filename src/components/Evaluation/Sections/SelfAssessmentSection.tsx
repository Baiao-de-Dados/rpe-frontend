import { useEffect, useMemo, memo, useRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { PillarSection } from '../PillarSection';
import {
    mockEvaluationPillars,
    type Criterion,
} from '../../../data/mockEvaluationPIllars';
import type { EvaluationFormData } from '../../../schemas/evaluation';

export const SelfAssessmentSection = memo(() => {
    const { control } = useFormContext<EvaluationFormData>();
    const isInitialized = useRef(false);

    const { fields, append } = useFieldArray({
        control,
        name: 'selfAssessment',
    });

    useEffect(() => {
        if (fields.length === 0 && !isInitialized.current) {
            const allCriteria = Object.values(mockEvaluationPillars).flatMap(
                pillar =>
                    pillar.criterios.map((criterion: Criterion) => ({
                        criterionId: criterion.id,
                        rating: null,
                        justification: '',
                    })),
            );

            allCriteria.forEach(criterion => append(criterion));
            isInitialized.current = true;
        }
    }, [fields.length, append]);

    const validFields = useMemo(
        () =>
            fields.map((field, index) => ({
                id: field.id,
                criterionId: field.criterionId,
                index: index,
            })),
        [fields],
    );

    return (
        <section>
            <div className="space-y-8">
                {Object.values(mockEvaluationPillars).map(pillar => (
                    <PillarSection
                        key={pillar.titulo}
                        pillarTitle={pillar.titulo}
                        criteria={pillar.criterios}
                        validFields={validFields}
                    />
                ))}
            </div>
        </section>
    );
});
