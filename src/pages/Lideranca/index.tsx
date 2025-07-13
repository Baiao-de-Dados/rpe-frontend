import { useMemo } from "react";
import { Loader2 } from "lucide-react";

import { useCycle } from "../../hooks/useCycle";
import { useLeadersAndCollaborators, getLeadersCount, getCollaboratorsCount, getLeadersEvaluationCompletion, getUnassignedCollaboratorsCount } from "../../hooks/api/useManagerQuery";

import PageHeader from "../../components/common/PageHeader";
import { LeadershipMetrics } from "../../components/Dashboard/LeadershipMetrics";
import LeadershipManagement from "../../components/Lideranca/LeadershipManagement";
import CycleLoading from "../../components/common/CycleLoading";
import CycleLoadErrorMessage from "../../components/Evaluation/CycleLoadErrorMessage";

export function Lideranca() {

    const { data, isLoading } = useLeadersAndCollaborators();

    const { isLoading: isCycleLoading, currentCycle } = useCycle();

    const leaders = useMemo(() => data?.leaders ?? [], [data]);
    const collaborators = useMemo(() => data?.collaborators ?? [], [data]);

    const totalLeaders = getLeadersCount(data);
    const totalCollaborators = getCollaboratorsCount(data);
    const completionPercentage = getLeadersEvaluationCompletion(data);
    const collaboratorsWithoutLeader = getUnassignedCollaboratorsCount(data);

    if (isCycleLoading) {
        return <CycleLoading />;
    }

    if (!currentCycle) {
        return <CycleLoadErrorMessage />;
    }

    return (
        <>
            <PageHeader title="Painel de Liderança" />
            <main className="p-8 pt-6">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center min-h-[300px]">
                        <Loader2 className="h-10 w-10 animate-spin text-primary-500 mb-2" />
                    </div>
                ) : (
                    <>
                        <LeadershipMetrics
                            totalLeaders={totalLeaders}
                            completionPercentage={completionPercentage}
                            collaboratorsWithoutLeader={collaboratorsWithoutLeader}
                            totalCollaborators={totalCollaborators}
                        />
                        <LeadershipManagement
                            leaders={leaders}
                            collaborators={collaborators}
                        />
                    </>
                )}
            </main>
        </>
    );
}
