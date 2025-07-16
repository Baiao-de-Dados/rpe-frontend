import { useQuery } from '@tanstack/react-query';
import { leaderEndpoints } from '../../services/api/leader';
import type { CollaboratorsEvaluationsSummary } from '../../types/collaborator';
import type { LeaderEvaluationPayload, GetLeaderEvaluationPayload, LeaderEvaluation, CycleLeaderAvg } from '../../types/leader';

export function useLeaderCollaboratorsEvaluation() {

    const query = useQuery<CollaboratorsEvaluationsSummary>({
        queryKey: ['leader-collaborators-evaluations-summary'],
        queryFn: async () => {
            const res = await leaderEndpoints.getLeaderCollaboratorsEvaluation();
            return res.data;
        },
        staleTime: 30 * 1000,
    });

    const allCycleAvgQuery = useQuery<CycleLeaderAvg[]>({
        queryKey: ['leader-all-cycle-avg'],
        queryFn: async () => {
            const res = await leaderEndpoints.getAllCycleAvg();
            return res.data;
        },
        staleTime: 30 * 1000,
    });

    const leaderEvaluation = async (payload: LeaderEvaluationPayload) => {
        return leaderEndpoints.leaderEvaluation(payload);
    };

    const getLeaderEvaluation = async (payload: GetLeaderEvaluationPayload): Promise<LeaderEvaluation> => {
        const res = await leaderEndpoints.getLeaderEvaluation(payload);
        return res.data;
    };

    return {
        ...query,
        leaderEvaluation,
        getLeaderEvaluation,
        allCycleAvg: allCycleAvgQuery.data,
        isLoadingAllCycleAvg: allCycleAvgQuery.isLoading,
        allCycleAvgQuery,
    };
}
