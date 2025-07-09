import { memo, useMemo } from 'react';

import NoEvaluationMessage from '../NoEvaluationMessage';
import { PillarSection } from '../PillarSection';
import mockEvaluations, { type Cycle } from '../../../../data/mockEvaluations';

interface SelfAssessmentSectionProps {
    selectedCycle: string;
}

export const SelfAssessmentSection = memo(({ selectedCycle }: SelfAssessmentSectionProps) => {
    const cycle = useMemo(
        () => mockEvaluations.cycles.find((c: Cycle) => c.cycleName === selectedCycle),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedCycle, mockEvaluations],
    );
    const pillars = cycle?.selfAssessment?.pillars || [];

    return (
        <section>
            {pillars.length > 0 ? (
                <div className="space-y-8">
                    {pillars.map(pillar => (
                        <PillarSection
                            key={pillar.pillarName}
                            pillarName={pillar.pillarName}
                            criteria={pillar.criteria}
                        />
                    ))}
                </div>
            ) : (
                <NoEvaluationMessage message="Nenhuma autoavaliação preenchida para este ciclo" />
            )}
        </section>
    );
});
