export interface Note {
    userId: number;
    notes: string;
    updatedAt: string;
}

export interface UpsertNotePayload {
    notes: string;
}

export interface GenerateAIEvaluationPayload {
    userId: number;
    cycledId: number;
}