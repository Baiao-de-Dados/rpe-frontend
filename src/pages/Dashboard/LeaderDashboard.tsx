import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { useCycle } from '../../hooks/useCycle';

import Button from '../../components/common/Button';
import Typography from '../../components/common/Typography';
import CycleLoading from '../../components/common/CycleLoading';
import CardContainer from '../../components/common/CardContainer';
import { LeaderMetrics } from '../../components/Dashboard/LeaderMetrics';
import { DashboardHeader } from '../../components/Dashboard/DashboardHeader';
import CycleLoadErrorMessage from '../../components/Evaluation/CycleLoadErrorMessage';
import CollaboratorEvaluationCard from '../../components/common/CollaboratorEvaluationCard';

import { useLeaderCollaboratorsEvaluation } from '../../hooks/api/useLeaderQuery';
import type { CollaboratorEvaluations } from '../../types/collaborator';
import { CycleBanner } from '../../components/Dashboard/CycleBanner';

interface CollaboratorEvaluationsWithScore extends CollaboratorEvaluations {
    leaderEvaluationScore: number | null;
}

export function LeaderDashboard() {

    const { user } = useAuth();

    const navigate = useNavigate();

    const { currentCycle, isLoading, status } = useCycle();

    const { data: leaderCollaboratorsEvaluations = [] } = useLeaderCollaboratorsEvaluation();

    const collaboratorsArray: CollaboratorEvaluationsWithScore[] = useMemo(() => (
        Array.isArray(leaderCollaboratorsEvaluations)
            ? leaderCollaboratorsEvaluations.map(item => ({
                ...item,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                leaderEvaluationScore: (item as any).leaderEvaluationScore ?? null
            }))
            : []
    ), [leaderCollaboratorsEvaluations]);

    const pendingReviews = useMemo(() =>
        collaboratorsArray.filter(summary => summary.leaderEvaluationScore == null).length,
        [collaboratorsArray]
    );

    const reviewsCompleted = useMemo(() =>
        collaboratorsArray.length - pendingReviews,
        [collaboratorsArray, pendingReviews]
    );

    const autoEvaluatedCount = useMemo(() =>
        collaboratorsArray.filter(summary => summary.autoEvaluationScore !== null && summary.autoEvaluationScore !== undefined).length,
        [collaboratorsArray]
    );
    const completionPercentage = useMemo(() =>
        collaboratorsArray.length > 0 ? Math.round((autoEvaluatedCount / collaboratorsArray.length) * 100) : 0,
        [collaboratorsArray, autoEvaluatedCount]
    );

    const averageManagerScore = useMemo(() => {
        const scores = collaboratorsArray
            .map(c => c.managerEvaluationScore)
            .filter(score => typeof score === 'number');
        return scores.length > 0 ? scores.reduce((acc, score) => acc + (score as number), 0) / scores.length : 0;
    }, [collaboratorsArray]);

    const averageLeaderScore = useMemo(() => {
        const scores = collaboratorsArray
            .map(c => c.leaderEvaluationScore)
            .filter(score => typeof score === 'number');
        return scores.length > 0 ? scores.reduce((acc, score) => acc + (score as number), 0) / scores.length : 0;
    }, [collaboratorsArray]);

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

                {status === 'open' || status === 'closed' ? (
                    <>
                        <LeaderMetrics
                            totalLeadership={collaboratorsArray.length}
                            reviewsCompleted={reviewsCompleted}
                            completionPercentage={completionPercentage}
                            pendingReviews={pendingReviews}
                            averageManagerScore={averageManagerScore}
                            averageLeaderScore={averageLeaderScore}
                        />
                        
                        {/* ✅ CORREÇÃO: Mostrar mensagem apropriada baseada no status do ciclo */}
                        {!currentCycle?.isActive && (
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <Typography variant="body" color="muted" className="text-sm">
                                    ⚠️ Ciclo de avaliação encerrado. As avaliações de líderes não estão mais disponíveis.
                                </Typography>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="mb-6">
                        <CycleBanner />
                    </div>
                )}

                <CardContainer className="w-full max-h-[36rem] flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-6 flex-shrink-0">
                        <Typography variant="h2" color="primary" className="font-bold text-lg sm:text-xl">
                            Meus liderados ({collaboratorsArray.length})
                        </Typography>
                        <Button variant="link" size="sm" onClick={() => navigate('/colaboradores')}>
                            Ver todos
                        </Button>
                    </div>
                    <div className="flex-1 overflow-y-scroll pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 min-h-0">
                        <div className="flex flex-col gap-3 sm:gap-4">
                            {status === 'upcoming' || status === undefined ? (
                                <Typography variant="body" className="text-neutral-500 text-center w-full py-8">
                                    O ciclo ainda não começou.
                                </Typography>
                            ) : collaboratorsArray.length === 0 ? (
                                <Typography variant="body" className="text-neutral-500 text-center w-full py-8">
                                    Nenhum colaborador está atribuído a você neste ciclo.
                                </Typography>
                            ) : (
                                collaboratorsArray.map(summary => (
                                    <CollaboratorEvaluationCard
                                        key={summary.collaborator.id}
                                        summary={summary}
                                        onClick={() => navigate(`/colaboradores/${summary.collaborator.id}/avaliacao`)}
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
