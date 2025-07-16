import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

import { useAuth } from '../../hooks/useAuth';
import { useCycle } from '../../hooks/useCycle';
import { 
    useCollaboratorsOnly,
    useTotalLeaders,
    useLeaderEvaluationPercentage,
    useCollaboratorsEvaluationsSummary
} from '../../hooks/api/useManagerQuery';

import Button from '../../components/common/Button';
import Typography from '../../components/common/Typography';
import CycleLoading from '../../components/common/CycleLoading';
import CardContainer from '../../components/common/CardContainer';
import { ManagerMetrics } from '../../components/Dashboard/ManagerMetrics';
import { DashboardHeader } from '../../components/Dashboard/DashboardHeader';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import CollaboratorEvaluationCard from '../../components/common/CollaboratorEvaluationCard';

export function ManagerDashboard() {

    const { user, isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const { currentCycle, isLoading: cycleLoading } = useCycle();

    // API queries
    const { data: collaboratorsOnly, isLoading: collaboratorsLoading, totalCollaborators } = useCollaboratorsOnly();
    const { data: totalLeadersData } = useTotalLeaders();
    const { data: leaderEvaluationPercentage } = useLeaderEvaluationPercentage();
    const { data: collaboratorsEvaluationsSummary } = useCollaboratorsEvaluationsSummary();

    // Combinar dados de colaboradores com dados de avaliação
    const collaboratorsWithCalculatedScores = useMemo(() => {
        if (!collaboratorsOnly || !collaboratorsEvaluationsSummary) return [];

        return collaboratorsOnly.map(collaborator => {
            // Buscar dados de avaliação para este colaborador
            const evaluationData = collaboratorsEvaluationsSummary.find(
                evalData => evalData.collaborator.id === collaborator.id
            );

            return {
                collaborator: {
                    id: collaborator.id,
                    name: collaborator.name,
                    position: collaborator.position,
                    email: 'colaborador@example.com', // TODO: Adicionar email na API
                    track: { id: 1, name: 'Default Track' } // TODO: Adicionar track na API
                },
                autoEvaluationScore: evaluationData?.autoEvaluation || null,
                evaluation360Score: evaluationData?.evaluation360 || null,
                managerEvaluationScore: evaluationData?.managerEvaluation || null,
                finalEvaluationScore: evaluationData?.equalization || null,
                status: evaluationData?.cycle ? 'pendente' as const : 'sem-ciclo' as const,
            };
        });
    }, [collaboratorsOnly, collaboratorsEvaluationsSummary]);

    const isLoading = authLoading || cycleLoading || collaboratorsLoading;

    const handleCollaboratorClick = (collaboratorId: number) => {
        navigate(`/colaboradores/${collaboratorId}/avaliacao`);
    };

    if (isLoading) {
        return <CycleLoading />;
    }

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
    }

    // Calcular métricas baseadas nos dados da API (apenas colaboradores)
    const totalLeaders = totalLeadersData?.totalLeaders || 0;
    
    // Para ciclo fechado
    const leadersCompleted = leaderEvaluationPercentage?.totalFilled || 0;

    // Calcular métricas baseadas nos dados reais dos colaboradores
    // Colaboradores que enviaram suas autoavaliações
    const collaboratorsWithAutoEvaluations = collaboratorsWithCalculatedScores.filter(summary => 
        summary.autoEvaluationScore !== null && summary.autoEvaluationScore !== undefined
    ) || [];
    
    // Colaboradores que o gestor ainda não avaliou
    const collaboratorsWithManagerEvaluations = collaboratorsWithCalculatedScores.filter(summary => 
        summary.managerEvaluationScore !== null && summary.managerEvaluationScore !== undefined
    ) || [];
    
    // Colaboradores que ainda não enviaram suas avaliações (autoavaliação)
    const collaboratorsWithoutAutoEvaluations = totalCollaborators - collaboratorsWithAutoEvaluations.length;
    
    // Colaboradores que o gestor ainda não avaliou
    const collaboratorsWithoutManagerEvaluations = totalCollaborators - collaboratorsWithManagerEvaluations.length;
    
    return (
        <>
            <DashboardHeader userName={user?.name || 'Gestor'} />
            <main className="p-8 pt-6">
                <div className="mb-6">
                    <ManagerMetrics
                        cycleStatus={currentCycle?.isActive ? 'open' : 'closed'}
                        totalLeaders={totalLeaders}
                        totalCollaborators={totalCollaborators}
                        completionPercentage={totalCollaborators > 0 ? Math.round(((totalCollaborators - collaboratorsWithoutAutoEvaluations) / totalCollaborators) * 100) : 0}
                        collaboratorsNotFinished={collaboratorsWithoutAutoEvaluations}
                        leadersCompleted={leadersCompleted}
                        collaboratorsNotCompleted={collaboratorsWithoutAutoEvaluations}
                        pendingReviews={collaboratorsWithoutManagerEvaluations}
                    />
                </div>

                <CardContainer className="w-full max-h-[36rem] flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-6 flex-shrink-0">
                        <Typography
                            variant="h2"
                            color="primary"
                            className="font-bold text-lg sm:text-xl"
                        >
                            Meus colaboradores ({totalCollaborators})
                        </Typography>
                        <Button
                            variant="link"
                            size="sm"
                            onClick={() => {
                                navigate('/colaboradores');
                            }}
                        >
                            Ver todos
                        </Button>
                    </div>
                

                    <div className="flex-1 overflow-y-scroll pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 min-h-0">
                        <div className="flex flex-col gap-3 sm:gap-4">
                            {collaboratorsWithCalculatedScores?.map((summary) => (
                                <CollaboratorEvaluationCard
                                    key={summary.collaborator.id}
                                    summary={summary}
                                    onClick={() => handleCollaboratorClick(summary.collaborator.id)}
                                    className="shadow-none border border-[#f0f0f0] px-2 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl w-full cursor-pointer hover:shadow-md transition-shadow"
                                />
                            ))}
                        </div>
                    </div>
                </CardContainer>
            </main>
        </>
    );
}
