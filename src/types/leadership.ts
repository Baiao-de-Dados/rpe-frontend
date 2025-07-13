import type { Project } from "./manager";

export interface Leader {
    id: number;
    name: string;
    project: Project
}

export interface LeaderCollaborator {
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
    collaborators: LeaderCollaborator[];
}
