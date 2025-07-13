import { z } from 'zod';

// Schema para avaliação geral do líder
export const leaderGeneralAssessmentSchema = z.object({
    generalRating: z
        .number({
            required_error: 'A nota geral é obrigatória',
            invalid_type_error: 'A nota deve ser um número',
        })
        .int('A nota deve ser um número inteiro')
        .min(1, 'A nota deve ser entre 1 e 5')
        .max(5, 'A nota deve ser entre 1 e 5')
        .refine(value => value !== null && value !== 0, 'A nota geral é obrigatória'),
    generalJustification: z
        .string({
            required_error: 'A justificativa geral é obrigatória',
        })
        .min(1, 'A justificativa não pode estar vazia')
        .max(2000, 'A justificativa deve ter no máximo 2000 caracteres')
        .trim()
        .refine(
            value => value.length > 0,
            'A justificativa não pode conter apenas espaços em branco',
        ),
    strengths: z
        .string()
        .max(1000, 'Os pontos fortes devem ter no máximo 1000 caracteres')
        .optional(),
    improvements: z
        .string()
        .max(1000, 'Os pontos de melhoria devem ter no máximo 1000 caracteres')
        .optional(),
});

// Schema completo para avaliação do líder (apenas avaliação geral)
export const fullLeaderEvaluationSchema = z.object({
    collaboratorId: z.number({
        required_error: 'O ID do colaborador é obrigatório',
    }),
    cycleId: z.number({
        required_error: 'O ID do ciclo é obrigatório',
    }),
    leaderId: z.number({
        required_error: 'O ID do líder é obrigatório',
    }),
    ...leaderGeneralAssessmentSchema.shape,
});

export type LeaderGeneralAssessmentFormData = z.infer<typeof leaderGeneralAssessmentSchema>;
export type FullLeaderEvaluationFormData = z.infer<typeof fullLeaderEvaluationSchema>;
