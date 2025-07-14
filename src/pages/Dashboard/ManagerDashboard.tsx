import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { useCycle } from '../../hooks/useCycle';
import { 
    useCollaboratorsEvaluationsSummary,
    useTotalLeaders,
    useMissingEvaluations,
    useLeaderEvaluationPercentage
} from '../../hooks/api/useManagerQuery';

import Button from '../../components/common/Button';
import Typography from '../../components/common/Typography';
import CycleLoading from '../../components/common/CycleLoading';
import CardContainer from '../../components/common/CardContainer';
import { CycleBanner } from '../../components/Dashboard/CycleBanner';
import { ManagerMetrics } from '../../components/Dashboard/ManagerMetrics';
import { DashboardHeader } from '../../components/Dashboard/DashboardHeader';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import CollaboratorEvaluationCard from '../../components/common/CollaboratorEvaluationCard';

export function ManagerDashboard() {

    const { user } = useAuth();
    const navigate = useNavigate();
    const { currentCycle, isLoading: cycleLoading } = useCycle();

    // API queries
    const { data: collaboratorsSummary, isLoading: collaboratorsLoading } = useCollaboratorsEvaluationsSummary();
    const { data: totalLeadersData } = useTotalLeaders();
    const { data: missingEvaluations } = useMissingEvaluations();
    const { data: leaderEvaluationPercentage } = useLeaderEvaluationPercentage();

    const isLoading = cycleLoading || collaboratorsLoading;

    const handleCollaboratorClick = (collaboratorId: number) => {
        navigate(`/colaboradores/${collaboratorId}/avaliacao`);
    };

    if (isLoading) {
        return <CycleLoading />;
    }

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
    }

    // Calcular métricas baseadas nos dados da API
    const totalCollaborators = collaboratorsSummary?.length || 0;
    const totalLeaders = totalLeadersData?.totalLeaders || 0;
    
    // Debug: Log dos dados
    console.log('Collaborators Summary Data:', collaboratorsSummary);
    console.log('Total Collaborators:', totalCollaborators);
    console.log('Total Leaders:', totalLeaders);
    console.log('Current User:', user);
    console.log('Current Cycle:', currentCycle);
    
    // Verificar se há ciclo ativo
    const hasActiveCycle = collaboratorsSummary?.some(summary => summary.cycle !== null);
    
    // Debug: Verificar se Maria Frontend está na lista
    const mariaFrontend = collaboratorsSummary?.find(summary => 
        summary.collaborator.name.includes('Maria') || 
        summary.collaborator.id === 4
    );
    console.log('Maria Frontend in list:', mariaFrontend);
    
    // Buscar notas calculadas da autoavaliação para cada colaborador
    const collaboratorsWithCalculatedScores = collaboratorsSummary?.map(summary => {
        // Se já tem nota calculada, usar ela
        if (summary.autoEvaluation !== null) {
            return summary;
        }
        
        // Se não tem nota calculada, retornar como está (será calculada pelo backend)
        return summary;
    });
    console.log('Maria Frontend autoEvaluation:', mariaFrontend?.autoEvaluation);
    console.log('Maria Frontend evaluation360:', mariaFrontend?.evaluation360);
    console.log('Maria Frontend managerEvaluation:', mariaFrontend?.managerEvaluation);
    console.log('Maria Frontend equalization:', mariaFrontend?.equalization);
    
    // Para ciclo aberto
    const collaboratorsNotFinished = totalCollaborators; // TODO: Calcular baseado em avaliações
    
    // Para ciclo fechado
    const leadersCompleted = leaderEvaluationPercentage?.totalFilled || 0;
    const collaboratorsNotCompleted = missingEvaluations?.missing || 0;
    const pendingReviews = totalCollaborators; // TODO: Calcular baseado em avaliações

    return (
        <>
            <DashboardHeader userName={user?.name || 'Gestor'} />
            <main className="p-8 pt-6 space-y-6">
                {currentCycle && (
                    <CycleBanner
                        cycleName={currentCycle.name}
                        status={currentCycle.isActive ? 'open' : 'closed'}
                        remainingDays={15} // TODO: Calcular dias restantes baseado no ciclo
                        linkTo="/avaliacao"
                    />
                )}

                <div className="mb-6">
                    <ManagerMetrics
                        cycleStatus={currentCycle.isActive ? 'open' : 'closed'}
                        totalLeaders={totalLeaders}
                        totalCollaborators={totalCollaborators}
                        completionPercentage={0} // TODO: Calcular baseado em avaliações
                        collaboratorsNotFinished={collaboratorsNotFinished}
                        leadersCompleted={leadersCompleted}
                        collaboratorsNotCompleted={collaboratorsNotCompleted}
                        pendingReviews={pendingReviews}
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
                    
                    {!hasActiveCycle && totalCollaborators > 0 && (
                        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <Typography variant="body" color="muted" className="text-sm">
                                ℹ️ Nenhum ciclo de avaliação ativo no momento. As avaliações estarão disponíveis quando um novo ciclo for iniciado.
                            </Typography>
                        </div>
                    )}

                    <div className="flex-1 overflow-y-scroll pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 min-h-0">
                        <div className="flex flex-col gap-3 sm:gap-4">
                            {collaboratorsWithCalculatedScores?.map((summary) => (
                                <CollaboratorEvaluationCard
                                    key={summary.collaborator.id}
                                    summary={{
                                        collaborator: {
                                            ...summary.collaborator,
                                            email: 'colaborador@example.com', // TODO: Adicionar email na API
                                            track: { id: 1, name: 'Default Track' } // TODO: Adicionar track na API
                                        },
                                        autoEvaluationScore: summary.autoEvaluation,
                                        evaluation360Score: summary.evaluation360,
                                        managerEvaluationScore: summary.managerEvaluation,
                                        finalEvaluationScore: summary.equalization,
                                        status: summary.cycle ? 'pendente' : 'sem-ciclo', // Status baseado na existência do ciclo
                                    }}
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
