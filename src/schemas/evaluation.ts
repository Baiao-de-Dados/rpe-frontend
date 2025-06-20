import { z } from 'zod';

export const mentoringSchema = z.object({
    mentoringRating: z
        .number({
            required_error: 'A nota é obrigatória',
            invalid_type_error: 'A nota deve ser um número',
        })
        .int('A nota deve ser um número inteiro')
        .min(1, 'A nota deve ser entre 1 e 5')
        .max(5, 'A nota deve ser entre 1 e 5'),
    mentoringJustification: z
        .string({
            required_error: 'A justificativa é obrigatória',
        })
        .min(1, 'A justificativa não pode estar vazia')
        .min(10, 'A justificativa deve ter pelo menos 10 caracteres')
        .max(1000, 'A justificativa deve ter no máximo 1000 caracteres')
        .trim()
        .refine(
            value => value.length > 0,
            'A justificativa não pode conter apenas espaços em branco',
        ),
});

export const referenceItemSchema = z.object({
    collaboratorId: z.string(),
    referencia: z
        .string()
        .min(10, 'A justificativa deve ter pelo menos 10 caracteres')
        .max(1000, 'A justificativa deve ter no máximo 1000 caracteres')
        .trim()
        .refine(
            value => value.length > 0,
            'A justificativa não pode conter apenas espaços em branco',
        ),
});

export const referencesSchema = z.object({
    referencias: z.array(referenceItemSchema),
});

export const fullEvaluationSchema = z.object({
    ...mentoringSchema.shape,
    ...referencesSchema.shape,
});
