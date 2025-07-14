import type { Track } from "./track";

export interface Collaborator {
    id: number;
    name: string;
    email: string;
    position: string;
    track: Track;
}

export interface CollaboratorEvaluations {
    collaborator: Collaborator;
    autoEvaluationScore: number | null;
    evaluation360Score: number | null,
    managerEvaluationScore: number | null,
    finalEvaluationScore: number | null,
    status: "pendente" | "finalizado";
}

export interface Network {
    sameProjectUsers: Collaborator[],
    mentor: Collaborator
}

export type CollaboratorsEvaluationsSummary = CollaboratorEvaluations[];