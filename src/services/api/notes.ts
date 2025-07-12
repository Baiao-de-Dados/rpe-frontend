import api from '.';

import type { GenerateAIEvaluationPayload, Note, UpsertNotePayload } from '../../types/notes';

export const notesEndpoints = {
    getNote: (userId: number) =>
        api.get<Note>(`/notes/${userId}`),
    upsertNote: (userId: number, payload: UpsertNotePayload) =>
        api.post<Note>(`/notes/${userId}`, payload),
    generateAIEvaluation: (payload: GenerateAIEvaluationPayload) =>
        api.post(`/ia/analisar-anotacoes`, payload),
};
