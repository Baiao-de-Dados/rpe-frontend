import { useEffect, useMemo, memo, useRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { PillarSection } from '../PillarSection';

import type { EvaluationFormData } from '../../../schemas/evaluation';

import { mockEvaluationPillars, type Criterion } from '../../../data/mockEvaluationPIllars';

export const SelfAssessmentSection = memo(() => {

    const { control } = useFormContext<EvaluationFormData>();
    const isInitialized = useRef(false);

    const { fields, replace } = useFieldArray({
        control,
        name: 'selfAssessment',
    });

    useEffect(() => {
        const allCriteria = Object.values(mockEvaluationPillars).flatMap(pillar =>
                pillar.criterios.map((criterion: Criterion) => ({
                    pilarId: pillar.id,
                    criterionId: criterion.id,
                    rating: null,
                    justification: '',
                    selfAssessmentIAValid: true,
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
            selfAssessmentIAValid: field.selfAssessmentIAValid,
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
