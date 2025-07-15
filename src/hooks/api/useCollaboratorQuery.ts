import type { SelfAssessmentDraft, Evaluation360Draft, MentoringDraft, ReferencesDraft, SelfAssessmentFormItem, Evaluation360FormItem, ReferencesFormItem } from '../../types/evaluations';

export type FormValues = {
    selfAssessment?: SelfAssessmentFormItem[];
    evaluation360?: Evaluation360FormItem[];
    mentoringJustification?: string;
    mentoringRating?: number;
    mentorId?: number;
    references?: ReferencesFormItem[];
};

import type { CollaboratorEvaluateDraft } from '../../types/evaluations';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { collaboratorsEndpoints } from '../../services/api/collaborators';

import type { Track } from '../../types/track';
import type { Network } from '../../types/collaborator';
import type { CollaboratorEvaluation } from '../../types/evaluations';
import type { CollaboratorEvaluatePayload } from '../../types/evaluations';

export const CYCLE_CRITERIA_QUERY_KEY = ['cycle', 'criteria'];
export const CYCLE_NETWORK_QUERY_KEY = ['cycle', 'network'];
export const CYCLE_EVALUATE_MUTATION_KEY = ['cycle', 'evaluate'];

export function useCycleCriteriaQuery(trackId?: number, options?: { enabled?: boolean }) {
    const isValid = typeof trackId === 'number' && trackId > 0;
    return useQuery<Track>({
        queryKey: [...CYCLE_CRITERIA_QUERY_KEY, trackId ?? 'none'],
        queryFn: async () => {
            if (!isValid) return undefined as unknown as Track;
            const res = await collaboratorsEndpoints.getCriteria(trackId!);
            return res.data;
        },
        enabled: options?.enabled ?? isValid,
        staleTime: 30 * 1000,
    });
}

export function useCycleNetworkQuery() {
    return useQuery<Network>({
        queryKey: CYCLE_NETWORK_QUERY_KEY,
        queryFn: async () => {
            const res = await collaboratorsEndpoints.getNetwork();
            return res.data;
        },
        staleTime: 30 * 1000,
    });
}

export function useCycleEvaluateMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: CYCLE_EVALUATE_MUTATION_KEY,
        mutationFn: async (payload: CollaboratorEvaluatePayload) => {
            const res = await collaboratorsEndpoints.evaluate(payload);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CYCLE_CRITERIA_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: CYCLE_NETWORK_QUERY_KEY });
        },
    });
}

export function useCollaboratorEvaluationQuery(cycleConfigId?: number, options?: { enabled?: boolean }) {
    const isValid = typeof cycleConfigId === 'number' && cycleConfigId > 0;
    return useQuery<CollaboratorEvaluation>({
        queryKey: ['collaborator', 'evaluation', cycleConfigId ?? 'none'],
        queryFn: async () => {
            if (!isValid) return undefined as unknown as CollaboratorEvaluation;
            const res = await collaboratorsEndpoints.getEvaluation(cycleConfigId!);
            return res.data;
        },
        enabled: options?.enabled ?? isValid,
        staleTime: 30 * 1000,
    });
}

export function useCollaboratorDraftQuery(cycleId?: number, options?: { enabled?: boolean }) {
    const isValid = typeof cycleId === 'number' && cycleId > 0;
    return useQuery<CollaboratorEvaluateDraft>({
        queryKey: ['collaborator', 'draft', cycleId ?? 'none'],
        queryFn: async () => {
            if (!isValid) return undefined as unknown as CollaboratorEvaluateDraft;
            const res = await collaboratorsEndpoints.getDraft(cycleId!);
            return res.data;
        },
        enabled: options?.enabled ?? isValid,
        staleTime: 30 * 1000,
    });
}

export function useSaveCollaboratorDraftMutation(cycleId?: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: CollaboratorEvaluateDraft) => {
            const res = await collaboratorsEndpoints.saveDraft(payload);
            return res.data;
        },
        onSuccess: () => {
            if (cycleId) {
                queryClient.invalidateQueries({ queryKey: ['collaborator', 'draft', cycleId] });
            }
        },
    });
}

export function buildCollaboratorDraftPayload(values: FormValues, cycleId: number): CollaboratorEvaluateDraft {

    const selfAssessmentGrouped: SelfAssessmentDraft[] = (values.selfAssessment || []).map((item: SelfAssessmentFormItem) => ({
        pillarId: Number(item.pilarId),
        criteriaId: Number(item.criterionId),
        rating: item.rating,
        justification: item.justification,
    }));

    const evaluation360: Evaluation360Draft[] = (values.evaluation360 || []).map((item: Evaluation360FormItem) => ({
        evaluateeId: Number(item.collaboratorId),
        strengths: item.strengths,
        improvements: item.improvements,
        rating: item.rating,
    }));

    const mentoring: MentoringDraft = {
        justification: values.mentoringJustification || '',
        rating: values.mentoringRating || 0,
        mentorId: values.mentorId || 0, // Ensure mentorId is included
    };

    const references: ReferencesDraft[] = (values.references || []).map((item: ReferencesFormItem) => ({
        collaboratorId: Number(item.collaboratorId),
        justification: item.justification,
    }));

    return {
        cycleId,
        draft: {
            selfAssessment: selfAssessmentGrouped,
            evaluation360,
            mentoring,
            references,
        },
    };
}