import { useAuth } from '../../hooks/useAuth';
import { useCycle } from '../../hooks/useCycle';

import Typography from '../../components/common/Typography';
import CycleLoading from '../../components/common/CycleLoading';
import { RHMetrics } from '../../components/Dashboard/RHMetrics';
import CardContainer from '../../components/common/CardContainer';
import { DashboardHeader } from '../../components/Dashboard/DashboardHeader';
import { RHPerformanceChart } from '../../components/Charts/RHPerformanceChart';
import { RHCollaboratorList } from '../../components/Dashboard/RHCollaboratorList';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';

import { mockRHMetrics, mockTrackData } from '../../data/mockRHData';
import { mockCollaboratorsSummary } from '../../data/mockCollaborators';
import { CycleBanner } from '../../components/Dashboard/CycleBanner';
import { formatDate, getRemainingDays } from '../../utils/globalUtils';

export function RHDashboard() {

    const { user } = useAuth();

    const { currentCycle, isLoading, status } = useCycle();

    if (isLoading) {
        return <CycleLoading />;
    }

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
    }

    return (
        <>
            <DashboardHeader userName={user?.name || 'Gestor RH'} />
            <main className="p-8 pt-6">

                {status === 'open' ? (
                    <div className="mb-6">
                        <RHMetrics
                            totalCollaborators={mockRHMetrics.totalCollaborators}
                            completedEvaluations={mockRHMetrics.completedEvaluations}
                            pendingEvaluations={mockRHMetrics.pendingEvaluations}
                            completionPercentage={mockRHMetrics.completionPercentage}
                            daysUntilClosure={getRemainingDays({ endDate: currentCycle.endDate }).daysToEnd}
                            closureDate={currentCycle.endDate && formatDate(currentCycle.endDate)}
                        />
                    </div>
                ) : (
                    <div className="mb-6">
                        <CycleBanner />
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    <section className="lg:col-span-5 xl:col-span-4 h-full flex flex-col min-h-[400px] max-h-[600px]">
                            <RHCollaboratorList evaluationsSummary={mockCollaboratorsSummary} />
                    </section>

                    <section className="lg:col-span-7 xl:col-span-8 h-full flex flex-col min-h-[400px] max-h-[600px]">
                        <CardContainer className="flex flex-col h-full">
                            <div className="mb-6">
                                <Typography variant="h2" color="primary" className="font-bold text-lg sm:text-xl">
                                    Preenchimento
                                </Typography>
                                <Typography variant="caption" color="muted" className="mt-1">
                                    Trilhas
                                </Typography>
                            </div>
                            <div className="flex-1 flex items-center min-h-0">
                                {status !== 'upcoming' && status !== 'undefined' ? (
                                    <RHPerformanceChart data={mockTrackData} />
                                ) : (
                                    <Typography variant="caption" color="muted" className="w-full text-center">
                                        O ciclo {currentCycle.name} de avaliação ainda não começou
                                    </Typography>
                                )}
                            </div>
                        </CardContainer>
                    </section>
                </div>
            </main>
        </>
    );
}
