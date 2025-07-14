import { z } from 'zod';

// Schema para a avaliação do manager sobre um critério específico
export const managerCriterionAssessmentSchema = z.object({
    pilarId: z.number({
        required_error: 'O ID do pilar é obrigatório',
    }),
    criterionId: z.number({
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
        .string()
        .min(1, 'A justificativa não pode estar vazia')
        .max(1000, 'A justificativa deve ter no máximo 1000 caracteres')
        .trim()
        .optional(), // Opcional já que não é enviada para o backend
});

// Schema completo para avaliação do manager (apenas autoavaliação - sem avaliação geral)
export const fullManagerEvaluationSchema = z.object({
    collaboratorId: z.number({
        required_error: 'O ID do colaborador é obrigatório',
    }),
    cycleId: z.number({
        required_error: 'O ID do ciclo é obrigatório',
    }),
    managerAssessment: z
        .array(managerCriterionAssessmentSchema)
        .min(1, 'Pelo menos uma avaliação de critério é obrigatória'),
});

export type ManagerCriterionAssessmentFormData = z.infer<typeof managerCriterionAssessmentSchema>;
export type FullManagerEvaluationFormData = z.infer<typeof fullManagerEvaluationSchema>;
