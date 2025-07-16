import { useAuth } from '../../hooks/useAuth';
import { useCycle } from '../../hooks/useCycle';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

import { useCommitteeDashboardMetrics, useCommitteeCollaboratorsSummary } from '../../hooks/api/useCommitteeQuery';

import Button from '../../components/common/Button';
import Typography from '../../components/common/Typography';
import CycleLoading from '../../components/common/CycleLoading';
import CardContainer from '../../components/common/CardContainer';
import { DashboardHeader } from '../../components/Dashboard/DashboardHeader';
import { CommitteeMetrics } from '../../components/Dashboard/CommitteeMetrics';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import CollaboratorEvaluationCard from '../../components/common/CollaboratorEvaluationCard';

export function CommitteeDashboard() {

    const { user } = useAuth();
    const navigate = useNavigate();

    const { currentCycle, isLoading: cycleLoading } = useCycle();

    // API queries
    const { data: dashboardMetrics, isLoading: metricsLoading } = useCommitteeDashboardMetrics();
    const { data: collaboratorsSummary, isLoading: collaboratorsLoading } = useCommitteeCollaboratorsSummary();

    const isLoading = cycleLoading || metricsLoading || collaboratorsLoading;

    // Converter dados para o formato esperado pelo CollaboratorEvaluationCard
    const collaboratorsWithCalculatedScores = useMemo(() => {
        if (!collaboratorsSummary) return [];

        return collaboratorsSummary.map(summary => ({
            collaborator: {
                id: summary.collaborator.id,
                name: summary.collaborator.name,
                position: summary.collaborator.position,
                email: 'colaborador@example.com', // TODO: Adicionar email na API
                track: { id: 1, name: 'Default Track' } // TODO: Adicionar track na API
            },
            autoEvaluationScore: summary.autoEvaluation,
            evaluation360Score: summary.evaluation360,
            managerEvaluationScore: summary.managerEvaluation,
            finalEvaluationScore: summary.committeeEqualization, // Nota final é a equalização
            status: summary.status === 'completed' ? 'finalizado' as const : 'pendente' as const,
        }));
    }, [collaboratorsSummary]);

    const handleCollaboratorClick = (collaboratorId: number) => {
        navigate(`/colaboradores/${collaboratorId}/avaliacao`);
    };

    if (isLoading) {
        return <CycleLoading />;
    }

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
    }

    return (
        <>
            <DashboardHeader userName={user?.name || 'Comitê'} />

            <main className="p-8 pt-6">
                <div className="mb-6">
                    <CommitteeMetrics
                        daysToDeadline={dashboardMetrics?.daysToDeadline || 0}
                        deadlineDate={dashboardMetrics?.deadlineDate || ''}
                        completionPercentage={dashboardMetrics?.completionPercentage || 0}
                        pendingEqualizations={dashboardMetrics?.pendingEqualizations || 0}
                    />
                </div>

                <CardContainer className="w-full max-h-[36rem] flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-6 flex-shrink-0">
                        <Typography
                            variant="h2"
                            color="primary"
                            className="font-bold text-lg sm:text-xl"
                        >
                            Resumo de equalizações ({collaboratorsWithCalculatedScores.length})
                        </Typography>
                        <Button
                            variant="link"
                            size="sm"
                            onClick={() => {
                                navigate('/colaboradores');
                            }}
                        >
                            Ver mais
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-scroll pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 min-h-0">
                        <div className="flex flex-col gap-3 sm:gap-4">
                            {collaboratorsWithCalculatedScores.length === 0 ? (
                                <div className="text-center py-12">
                                    <Typography variant="body" className="text-gray-500">
                                        {collaboratorsLoading ? 'Carregando colaboradores...' : 'Nenhum colaborador encontrado para equalização'}
                                    </Typography>
                                    {!collaboratorsLoading && (
                                        <Typography variant="caption" className="text-gray-400 mt-2">
                                            Verifique se há colaboradores no sistema e se você tem permissão para visualizá-los.
                                        </Typography>
                                    )}
                                </div>
                            ) : (
                                collaboratorsWithCalculatedScores.map((summary) => (
                                    <CollaboratorEvaluationCard
                                        key={summary.collaborator.id}
                                        summary={summary}
                                        onClick={() => handleCollaboratorClick(summary.collaborator.id)}
                                        className="shadow-none border border-[#f0f0f0] px-2 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl w-full cursor-pointer hover:shadow-md transition-shadow"
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </CardContainer>
            </main>
        </>
    );
}
