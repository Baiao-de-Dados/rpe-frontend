import { memo, useMemo } from 'react';

import AnimatedCard from '../../../common/AnimatedCard';

import NoEvaluationMessage from '../NoEvaluationMessage';

import Evaluation360Card from '../Cards/Evaluation360Card';

import mockEvaluations, { type Cycle } from '../../../../data/mockEvaluations';

interface Evaluation360SectionProps {
    selectedCycle: string;
}

export const Evaluation360Section = memo(({ selectedCycle }: Evaluation360SectionProps) => {

    const cycle = useMemo(
        () => mockEvaluations.cycles.find((c: Cycle) => c.cycleName === selectedCycle),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedCycle, mockEvaluations]
    );

    const evaluations = cycle?.evaluation360?.evaluation || [];

    return (
        <section>
            {evaluations.length > 0 ? (
                <div className="space-y-6 relative">
                    {evaluations.map((eval360, idx) => (
                        <AnimatedCard key={`eval360-${eval360.collaratorName}-${idx}`} index={idx}>
                            <Evaluation360Card
                                collaborator={{ 
                                    name: eval360.collaratorName, 
                                    position: eval360.collaboratorPosition 
                                }}
                                rating={eval360.rating}
                                strengths={eval360.strengths}
                                improvements={eval360.improvements}
                            />
                        </AnimatedCard>
                    ))}
                </div>
            ) : (
                <NoEvaluationMessage message="Nenhuma avaliação 360 adicionada para este ciclo" />
            )}
        </section>
    );
});