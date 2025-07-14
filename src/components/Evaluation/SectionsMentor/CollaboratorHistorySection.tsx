import { memo } from 'react';

import Typography from '../../common/Typography';
import CardContainer from '../../common/CardContainer';
import { useCollaboratorAllEvaluations } from '../../../hooks/api/useManagerQuery';

interface CollaboratorHistorySectionProps {
    collaboratorId: number;
    collaboratorName: string;
}

export const CollaboratorHistorySection = memo(({ 
    collaboratorId, 
    collaboratorName 
}: CollaboratorHistorySectionProps) => {

    const { data: allEvaluations, isLoading } = useCollaboratorAllEvaluations(collaboratorId);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (!allEvaluations || allEvaluations.length === 0) {
        return (
            <CardContainer className="p-6">
                <Typography variant="h3" color="primary" className="mb-4">
                    Histórico de Avaliações
                </Typography>
                <Typography variant="body" color="muted">
                    Nenhuma avaliação encontrada para {collaboratorName}.
                </Typography>
            </CardContainer>
        );
    }

    return (
        <div className="space-y-6">
            <Typography variant="h3" color="primary" className="mb-6">
                Histórico de Avaliações - {collaboratorName}
            </Typography>

            <div className="space-y-4">
                {allEvaluations.map((evaluation, index) => (
                    <CardContainer key={index} className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <Typography variant="h4" color="primary" className="font-semibold">
                                    {evaluation.cycle.name}
                                </Typography>
                                <Typography variant="body" color="muted" className="text-sm">
                                    {new Date(evaluation.cycle.startDate).toLocaleDateString('pt-BR')} - {new Date(evaluation.cycle.endDate).toLocaleDateString('pt-BR')}
                                </Typography>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <Typography variant="body" color="muted" className="text-sm mb-1">
                                    Autoavaliação
                                </Typography>
                                <Typography variant="h4" color="primary" className="font-bold">
                                    {evaluation.autoEvaluation ? evaluation.autoEvaluation.toFixed(1) : 'N/A'}
                                </Typography>
                            </div>

                            <div className="text-center">
                                <Typography variant="body" color="muted" className="text-sm mb-1">
                                    360°
                                </Typography>
                                <Typography variant="h4" color="primary" className="font-bold">
                                    {evaluation.evaluation360 ? evaluation.evaluation360.toFixed(1) : 'N/A'}
                                </Typography>
                            </div>

                            <div className="text-center">
                                <Typography variant="body" color="muted" className="text-sm mb-1">
                                    Manager
                                </Typography>
                                <Typography variant="h4" color="primary" className="font-bold">
                                    {evaluation.manager ? evaluation.manager.toFixed(1) : 'N/A'}
                                </Typography>
                            </div>

                            <div className="text-center">
                                <Typography variant="body" color="muted" className="text-sm mb-1">
                                    Comitê
                                </Typography>
                                <Typography variant="h4" color="primary" className="font-bold">
                                    {evaluation.committee ? evaluation.committee.toFixed(1) : 'N/A'}
                                </Typography>
                            </div>
                        </div>
                    </CardContainer>
                ))}
            </div>
        </div>
    );
});
