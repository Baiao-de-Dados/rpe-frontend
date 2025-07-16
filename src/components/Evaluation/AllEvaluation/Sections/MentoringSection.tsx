import { useMemo } from 'react';

import MentoringCard from '../Cards/MentoringCard';

import NoEvaluationMessage from '../NoEvaluationMessage';

import type { EvaluationCycle } from '../../../../types/evaluations';

import { useAllEvaluationQuery } from '../../../../hooks/api/useCollaboratorQuery';

interface MentoringSectionProps {
    selectedCycle: string;
}

export function MentoringSection({ selectedCycle }: MentoringSectionProps) {
    const { data, isLoading, isError } = useAllEvaluationQuery();
    const cycle = useMemo(() => {
        if (!data) return undefined;
        return data.cycles.find((c: EvaluationCycle) => c.cycleName === selectedCycle);
    }, [data, selectedCycle]);
    const mentoring = cycle?.mentoring;

    if (isLoading) {
        return <NoEvaluationMessage message="Carregando mentoria..." />;
    }
    if (isError) {
        return <NoEvaluationMessage message="Erro ao carregar mentoria." />;
    }
    return (
        <section>
            {mentoring ? (
                <MentoringCard
                    mentorName={mentoring.mentorName || 'Mentor'}
                    mentoringRating={mentoring.rating}
                    mentoringJustification={mentoring.justification}
                />
            ) : (
                <NoEvaluationMessage message="Nenhuma avaliação de mentoria para este ciclo" />
            )}
        </section>
    );
}
