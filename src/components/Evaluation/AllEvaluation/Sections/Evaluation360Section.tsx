import { memo, useMemo } from 'react';

import AnimatedCard from '../../../common/AnimatedCard';

import NoEvaluationMessage from '../NoEvaluationMessage';

import Evaluation360Card from '../Cards/Evaluation360Card';

import { useAllEvaluationQuery } from '../../../../hooks/api/useCollaboratorQuery';
import type { EvaluationCycle } from '../../../../types/evaluations';


interface Evaluation360SectionProps {
    selectedCycle: string;
}


export const Evaluation360Section = memo(function Evaluation360Section({ selectedCycle }: Evaluation360SectionProps) {
    const { data, isLoading, isError } = useAllEvaluationQuery();
    const cycle = useMemo(() => {
        if (!data) return undefined;
        return data.cycles.find((c: EvaluationCycle) => c.cycleName === selectedCycle);
    }, [data, selectedCycle]);
    const evaluations = cycle?.evaluation360?.evaluation || [];

    if (isLoading) {
        return <NoEvaluationMessage message="Carregando avaliações 360..." />;
    }
    if (isError) {
        return <NoEvaluationMessage message="Erro ao carregar avaliações 360." />;
    }
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