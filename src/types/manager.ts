import type { Leader } from "./leadership";

export interface AssignLeaderEvaluationPayload {
    collaboratorId: number;
    cycleId: number;
    leaderId: number | null;
}

export interface Project {
    projectId: number;
    projectName: string;
}

export interface ManagerCollaborator {
    id: number;
    name: string;
    position: string;
    project: Project;
    leaderId: number | null;
    leaderRating: number | null;
}

export interface LeadersAndCollaborators {
    leaders: Leader[];
    collaborators: ManagerCollaborator[];
}
