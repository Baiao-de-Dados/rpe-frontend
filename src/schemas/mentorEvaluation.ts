import { z } from 'zod';

// Schema para a avaliação do mentor sobre um critério específico
export const mentorCriterionAssessmentSchema = z.object({
    pilarId: z.string({
        required_error: 'O ID do pilar é obrigatório',
    }),
    criterionId: z.string({
        required_error: 'O ID do critério é obrigatório',
    }),
    rating: z
        .number({
            required_error: 'A nota é obrigatória',
            invalid_type_error: 'A nota deve ser um número',
        })
        .int('A nota deve ser um número inteiro')
        .min(1, 'A nota deve ser entre 1 e 5')
        .max(5, 'A nota deve ser entre 1 e 5')
        .nullable()
        .refine(value => value !== null && value !== 0, 'A nota é obrigatória'),
    justification: z
        .string({
            required_error: 'A justificativa é obrigatória',
        })
        .min(1, 'A justificativa não pode estar vazia')
        .max(1000, 'A justificativa deve ter no máximo 1000 caracteres')
        .trim()
        .refine(
            value => value.length > 0,
            'A justificativa não pode conter apenas espaços em branco',
        ),
});

// Schema para avaliação geral do mentor
export const mentorGeneralAssessmentSchema = z.object({
    generalRating: z
        .number({
            required_error: 'A nota geral é obrigatória',
            invalid_type_error: 'A nota deve ser um número',
        })
        .int('A nota deve ser um número inteiro')
        .min(1, 'A nota deve ser entre 1 e 5')
        .max(5, 'A nota deve ser entre 1 e 5')
        .nullable()
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

// Schema completo para avaliação do mentor
export const fullMentorEvaluationSchema = z.object({
    collaboratorId: z.string({
        required_error: 'O ID do colaborador é obrigatório',
    }),
    cycleId: z.string({
        required_error: 'O ID do ciclo é obrigatório',
    }),
    mentorAssessment: z
        .array(mentorCriterionAssessmentSchema)
        .min(1, 'Pelo menos uma avaliação de critério é obrigatória'),
    ...mentorGeneralAssessmentSchema.shape,
});

export type MentorCriterionAssessmentFormData = z.infer<typeof mentorCriterionAssessmentSchema>;
export type MentorGeneralAssessmentFormData = z.infer<typeof mentorGeneralAssessmentSchema>;
export type FullMentorEvaluationFormData = z.infer<typeof fullMentorEvaluationSchema>;
