import { useMemo } from 'react';

import MentoringCard from '../Cards/Mentoring';

import NoEvaluationMessage from '../NoEvaluationMessage';

import mockEvaluations, { type Cycle } from '../../../../data/mockEvaluations';

interface MentoringSectionProps {
    selectedCycle: string;
}

export function MentoringSection({ selectedCycle }: MentoringSectionProps) {
    
    const cycle = useMemo(
        () => mockEvaluations.cycles.find((c: Cycle) => c.cycleName === selectedCycle),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedCycle, mockEvaluations]
    );

    const mentoring = cycle?.mentoring;

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
