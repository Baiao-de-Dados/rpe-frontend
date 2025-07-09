import { useEffect, useMemo, memo, useRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { PillarSection } from '../PillarSection';



export const SelfAssessmentSection = memo(() => {

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
