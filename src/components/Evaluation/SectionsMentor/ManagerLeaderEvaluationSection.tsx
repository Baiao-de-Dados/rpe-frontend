import { useMemo } from 'react';

import CardContainer from '../../common/CardContainer';
import Typography from '../../common/Typography';
import StarRating from '../../common/StarRating';
import TextAreaWithTitle from '../../common/TextAreaWithTitle';
import CollaboratorCard from '../../common/CollaboratorCard';
import RatingDisplay from '../../common/RatingDisplay';

import { mockLeaderEvaluations } from '../../../data/mockLeaderEvaluations';
import type { LeaderEvaluation } from '../../../data/mockLeaderEvaluations';

interface ManagerLeaderEvaluationSectionProps {
    collaboratorId: string;
    collaboratorName: string;
}

export function ManagerLeaderEvaluationSection({
    collaboratorId,
    collaboratorName
}: ManagerLeaderEvaluationSectionProps) {

    // Buscar a avaliação do líder para este colaborador neste ciclo
    const leaderEvaluation = useMemo(() => {
        if (!collaboratorId) return null;
        
        // Para desenvolvimento, vamos buscar por collaboratorId apenas
        // Quando tiver API real, adicionar filtro por ciclo
        return mockLeaderEvaluations.find(
            (evaluation: LeaderEvaluation) => 
                evaluation.collaboratorId === collaboratorId
                // && evaluation.cycleId === currentCycle?.id // Comentado para desenvolvimento
        );
    }, [collaboratorId]);

    if (!leaderEvaluation) {
        return (
            <CardContainer>
                <div className="text-center py-8">
                    <Typography variant="h3" className="text-gray-500 mb-2">
                        Nenhuma avaliação de líder encontrada
                    </Typography>
                    <Typography variant="body" className="text-gray-400">
                        Este colaborador ainda não foi avaliado por um líder neste ciclo.
                    </Typography>
                </div>
            </CardContainer>
        );
    }

    const leader = {
        id: leaderEvaluation.leaderId,
        nome: leaderEvaluation.leaderName,
        cargo: 'Líder',
        image: leaderEvaluation.leaderImage,
        avatar: leaderEvaluation.leaderAvatar,
    };

    return (
        <div className="space-y-6">
            <CardContainer>
                <div className="flex items-center gap-4 mb-6">
                    <CollaboratorCard collaborator={leader} variant="compact" />
                    <div className="ml-auto">
                        <RatingDisplay rating={leaderEvaluation.generalRating} />
                    </div>
                </div>

                <Typography variant="h3" className="text-lg font-semibold mb-4">
                    Avaliação do Líder para {collaboratorName}
                </Typography>

                <div className="space-y-6">
                    {/* Avaliação Geral */}
                    <div>
                        <Typography variant="body" className="text-sm text-gray-600 mb-3">
                            Avaliação geral (1 a 5)
                        </Typography>
                        <StarRating 
                            value={leaderEvaluation.generalRating} 
                            readOnly 
                        />
                    </div>

                    {/* Justificativa */}
                    <TextAreaWithTitle
                        title="Justificativa da avaliação"
                        value={leaderEvaluation.generalJustification || ''}
                        readOnly
                        placeholder="Nenhuma justificativa fornecida"
                        maxLength={1000}
                    />

                    {/* Pontos Fortes */}
                    <TextAreaWithTitle
                        title="Pontos fortes identificados"
                        value={leaderEvaluation.strengths || ''}
                        readOnly
                        placeholder="Nenhum ponto forte identificado"
                        maxLength={1000}
                    />

                    {/* Pontos de Melhoria */}
                    <TextAreaWithTitle
                        title="Pontos de melhoria sugeridos"
                        value={leaderEvaluation.improvements || ''}
                        readOnly
                        placeholder="Nenhum ponto de melhoria sugerido"
                        maxLength={1000}
                    />
                </div>
            </CardContainer>
        </div>
    );
}
