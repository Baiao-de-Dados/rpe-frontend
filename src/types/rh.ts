export interface GetRHCollaborators {
    id: number;
    name: string;
    email: string;
    position: string;
    track: string;
    scores: Array<{
        cycleId: number;
        cycleName: string;
        av360Score: number | null;
        autoEvaluationScore: number | null;
        managerScore: number | null;
        equalizationScore: number | null;
    }>;
}

export interface GetRHDashboard {
    completionPercentage: number,
    pendingEvaluations: number
}

export interface GetRHTracks {
    tracks: {
        track: string;
        totalUsers: number;
        completedUsers: number;
        pendingUsers: number;
        completionPercentage: number;
    }[];
}
