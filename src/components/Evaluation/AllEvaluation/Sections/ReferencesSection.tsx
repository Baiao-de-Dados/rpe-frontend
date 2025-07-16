import { memo, useMemo } from 'react';

import ReferenceCard from '../Cards/ReferenceCard';

import AnimatedCard from '../../../common/AnimatedCard';

import NoEvaluationMessage from '../NoEvaluationMessage';

import { useAllEvaluationQuery } from '../../../../hooks/api/useCollaboratorQuery';
import type { EvaluationCycle } from '../../../../types/evaluations';

interface ReferencesSectionProps {
    selectedCycle: string;
}

export const ReferencesSection = memo(function ReferencesSection({ selectedCycle }: ReferencesSectionProps) {
    const { data, isLoading, isError } = useAllEvaluationQuery();
    const cycle = useMemo(() => {
        if (!data) return undefined;
        return data.cycles.find((c: EvaluationCycle) => c.cycleName === selectedCycle);
    }, [data, selectedCycle]);
    const references = cycle?.reference || [];

    if (isLoading) {
        return <NoEvaluationMessage message="Carregando referências..." />;
    }
    if (isError) {
        return <NoEvaluationMessage message="Erro ao carregar referências." />;
    }
    return (
        <section>
            {references.length > 0 ? (
                <div className="space-y-6 relative">
                    {references.map((ref, idx) => (
                        <AnimatedCard key={`ref-${ref.collaratorName}-${idx}`} index={idx}>
                            <ReferenceCard
                                collaborator={{
                                    name: ref.collaratorName,
                                    position: ref.collaboratorPosition
                                }}
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