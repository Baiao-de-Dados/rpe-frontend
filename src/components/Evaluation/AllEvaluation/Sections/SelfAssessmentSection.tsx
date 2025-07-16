import { memo, useMemo } from 'react';
import { PillarSection } from '../PillarSection';
import NoEvaluationMessage from '../NoEvaluationMessage';
import type { EvaluationCycle } from '../../../../types/evaluations';
import { useAllEvaluationQuery } from '../../../../hooks/api/useCollaboratorQuery';

interface SelfAssessmentSectionProps {
    selectedCycle: string;
}

export const SelfAssessmentSection = memo(function SelfAssessmentSection({ selectedCycle }: SelfAssessmentSectionProps) {

    const { data, isLoading, isError } = useAllEvaluationQuery();

    const cycle = useMemo(() => {
        if (!data) return undefined;
        return data.cycles.find((c: EvaluationCycle) => c.cycleName === selectedCycle);
    }, [data, selectedCycle]);

    const pillars = cycle?.selfAssessment?.pillars || [];

    if (isLoading) {
        return <NoEvaluationMessage message="Carregando autoavaliação..." />;
    }
    if (isError) {
        return <NoEvaluationMessage message="Erro ao carregar autoavaliação." />;
    }
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
