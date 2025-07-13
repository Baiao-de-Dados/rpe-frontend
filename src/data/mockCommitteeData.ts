import { mockCollaboratorsSummary } from "./mockCollaborators";
import type { CollaboratorsEvaluationsSummary } from "../types/collaborator";

export interface CommitteeData {
    daysToDeadline: number;
    deadlineDate: string;
    completionPercentage: number;
    pendingEqualizations: number;
    collaboratorsSummary: CollaboratorsEvaluationsSummary;
}

export const mockCommitteeData: CommitteeData = {
    daysToDeadline: 30,
    deadlineDate: '30/08/2025',
    completionPercentage: 60,
    pendingEqualizations: 10,
    collaboratorsSummary: mockCollaboratorsSummary
};
