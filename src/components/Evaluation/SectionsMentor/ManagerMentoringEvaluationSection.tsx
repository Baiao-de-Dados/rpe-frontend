import { useMemo } from 'react';

import MenteeEvaluationCard from '../AllEvaluation/Cards/MenteeEvaluationCard';
import CardContainer from '../../common/CardContainer';
import Typography from '../../common/Typography';

import { mockMentoringEvaluations } from '../../../data/mockMentoringEvaluations';
import type { MentoringEvaluation } from '../../../data/mockMentoringEvaluations';

interface ManagerMentoringEvaluationSectionProps {
    collaboratorId: number;
    collaboratorName: string;
}

export function ManagerMentoringEvaluationSection({
    collaboratorId,
    collaboratorName
}: ManagerMentoringEvaluationSectionProps) {

    // Buscar as avaliações de mentoria que este colaborador recebeu neste ciclo
    const mentoringEvaluations = useMemo(() => {
        if (!collaboratorId) return [];
        
        // Para desenvolvimento, vamos buscar por mentorId apenas
        // Quando tiver API real, adicionar filtro por ciclo
        return mockMentoringEvaluations.filter(
            (evaluation: MentoringEvaluation) => 
                evaluation.mentorId === collaboratorId
                // && evaluation.cycleId === currentCycle?.id // Comentado para desenvolvimento
        );
    }, [collaboratorId]);

    if (mentoringEvaluations.length === 0) {
        return (
            <CardContainer>
                <div className="text-center py-8">
                    <Typography variant="h3" className="text-gray-500 mb-2">
                        Nenhuma avaliação de mentoria encontrada
                    </Typography>
                    <Typography variant="caption" color="muted">
                        {collaboratorName} não recebeu avaliações como mentor neste ciclo.
                    </Typography>
                </div>
            </CardContainer>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <Typography variant="h2" className="mb-4">
                    Avaliações de Mentoria para {collaboratorName}
                </Typography>
                <Typography variant="caption" color="muted">
                    Estas são as avaliações que {collaboratorName} recebeu como mentor neste ciclo.
                </Typography>
            </div>

            {mentoringEvaluations.map((evaluation: MentoringEvaluation) => (
                <MenteeEvaluationCard
                    key={evaluation.id}
                    menteeName={evaluation.menteeName} // <- Nome do mentee que avaliou
                    menteeCargo={evaluation.menteeCargo || 'Colaborador'} // <- Cargo do mentee
                    rating={evaluation.rating}
                    justification={evaluation.justification}
                />
            ))}
        </div>
    );
}
