import { memo, useMemo } from 'react';
import AnimatedCard from '../../../common/AnimatedCard';
import NoEvaluationMessage from '../NoEvaluationMessage';
import ReferenceCard from '../Cards/ReferenceCard';
import mockEvaluations, { type Cycle } from '../../../../data/mockEvaluations';

interface ReferencesSectionProps {
    selectedCycle: string;
}

export const ReferencesSection = memo(({ selectedCycle }: ReferencesSectionProps) => {
    const cycle = useMemo(
        () => mockEvaluations.cycles.find((c: Cycle) => c.cycleName === selectedCycle),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedCycle, mockEvaluations]
    );
    const references = cycle?.reference || [];

    return (
        <section>
            {references.length > 0 ? (
                <div className="space-y-6 relative">
                    {references.map((ref, idx) => (
                        <AnimatedCard key={`ref-${ref.collaratorName}-${idx}`} index={idx}>
                            <ReferenceCard
                                collaborator={{ id: idx, nome: ref.collaratorName, cargo: ref.collaboratorPosition }}
                                justification={ref.justification}
                            />
                        </AnimatedCard>
                    ))}
                </div>
            ) : (
                <NoEvaluationMessage message="Nenhuma referência adicionada para este ciclo" />
            )}
        </section>
    );
});