export interface Leader {
    id: number;
    name: string;
    project: {
        projectId: number;
        projectName: string;
    };
}

export interface Collaborator {
    id: number;
    name: string;
    position: string;
    project: {
        projectId: number;
        projectName: string;
    };
    leaderId: number | null;
    leaderRating: number | null; 
}

export interface LeadershipData {
    leaders: Leader[];
    collaborators: Collaborator[];
}
