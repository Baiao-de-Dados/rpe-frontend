import { useMemo } from "react";
import type { Leader, LeaderCollaborator } from "../types/leadership";

interface LeadershipMetrics {
    totalLeaders: number;
    totalCollaborators: number;
    collaboratorsWithoutLeader: number;
    completionPercentage: number;
}

export function useLeadershipMetrics(originalCollaborators: LeaderCollaborator[], leaders: Leader[]): LeadershipMetrics {

    const metrics = useMemo(() => {

        const totalLeaders = leaders.length;
        const totalCollaborators = originalCollaborators.length;
        const collaboratorsWithoutLeader = originalCollaborators.filter(collaborator => collaborator.leaderId === null).length;

        const collaboratorsWithLeader = originalCollaborators.filter(collaborator => collaborator.leaderId !== null);
        const evaluationsCompleted = collaboratorsWithLeader.filter(collaborator => collaborator.leaderRating !== null).length;
        const completionPercentage = collaboratorsWithLeader.length > 0 
            ? Math.round((evaluationsCompleted / collaboratorsWithLeader.length) * 100)
            : 0;
        
        return {
            totalLeaders,
            totalCollaborators,
            collaboratorsWithoutLeader,
            completionPercentage
        };

    }, [originalCollaborators, leaders]);

    return metrics;
}
