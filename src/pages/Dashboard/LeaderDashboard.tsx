import { useState } from 'react';

import { useAuth } from '../../hooks/useAuth';
import { useCycle } from '../../hooks/useCycle';

import Button from '../../components/common/Button';
import Typography from '../../components/common/Typography';
import CycleLoading from '../../components/common/CycleLoading';
import CardContainer from '../../components/common/CardContainer';
import { CycleBanner } from '../../components/Dashboard/CycleBanner';
import { LeaderMetrics } from '../../components/Dashboard/LeaderMetrics';
import { DashboardHeader } from '../../components/Dashboard/DashboardHeader';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import CollaboratorEvaluationCard from '../../components/common/CollaboratorEvaluationCard';

import { mockManagerData, type ManagerData } from '../../data/mockManagerData';

export function LeaderDashboard() {

    const { user } = useAuth();

    const { currentCycle, isLoading } = useCycle();

    const [managerData] = useState<ManagerData>(mockManagerData);

    if (isLoading) {
        return <CycleLoading />;
    }

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
    }

    return (
        <>
            <DashboardHeader userName={user?.name || 'Líder'} />
            <main className="p-8 pt-6 space-y-6">
                {currentCycle && (
                <CycleBanner
                    cycleName={currentCycle.name}
                    status={currentCycle.isActive ? 'open' : 'closed'}
                    remainingDays={managerData.daysToDeadline}
                    linkTo="/avaliacao"
                />
                )}

                <div className="mb-6">
                <LeaderMetrics
                    cycleStatus={currentCycle.isActive ? 'open' : 'closed'}
                    totalLeadership={5}
                    reviewsCompleted={5}
                    completionPercentage={20}
                    pendingReviews={3}
                    averageManagerScore={4.2}
                    averageLeaderScore={3.2}
                />
                </div>

                <CardContainer className="w-full max-h-[36rem] flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-6 flex-shrink-0">
                    <Typography
                    variant="h2"
                    color="primary"
                    className="font-bold text-lg sm:text-xl"
                    >
                    Meus liderados ({managerData.managedCollaborators.length})
                    </Typography>
                    <Button
                    variant="link"
                    size="sm"
                    onClick={() => {
                        // TODO: Navegar para página completa de colaboradores
                    }}
                    >
                    Ver todos
                    </Button>
                </div>

                <div className="flex-1 overflow-y-scroll pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 min-h-0">
                    <div className="flex flex-col gap-3 sm:gap-4">
                    {managerData.managedCollaborators.map(summary => (
                        <CollaboratorEvaluationCard
                            key={summary.collaborator.id}
                            summary={summary}
                            onClick={() => {
                            // TODO: Navegar para avaliação do colaborador
                            console.log('Abrir avaliação do colaborador:', summary.collaborator.id);
                            }}
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
