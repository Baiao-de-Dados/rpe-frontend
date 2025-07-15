import { useAuth } from '../../hooks/useAuth';
import { useCycle } from '../../hooks/useCycle';
import { useNavigate } from 'react-router-dom';

import { mockCommitteeData } from '../../data/mockCommitteeData';

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

    const { currentCycle, isLoading } = useCycle();

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
                        daysToDeadline={mockCommitteeData.daysToDeadline}
                        deadlineDate={mockCommitteeData.deadlineDate}
                        completionPercentage={mockCommitteeData.completionPercentage}
                        pendingEqualizations={mockCommitteeData.pendingEqualizations}
                    />
                </div>

                <CardContainer className="w-full max-h-[36rem] flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-6 flex-shrink-0">
                        <Typography
                            variant="h2"
                            color="primary"
                            className="font-bold text-lg sm:text-xl"
                        >
                            Resumo de equalizações
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
                            {mockCommitteeData.collaboratorsSummary.map(summary => (
                                <CollaboratorEvaluationCard
                                    key={summary.collaborator.id}
                                    summary={summary}
                                    onClick={() => console.log('Abrir equalização:', summary.collaborator.id)}
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
