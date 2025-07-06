import * as z from 'zod';

export const criterionSchema = z.object({
    id: z.number(),
    name: z
        .string()
        .min(1, 'O nome é obrigatório')
        .max(100, 'O nome deve ter no máximo 100 caracteres'),
    description: z
        .string()
        .max(500, 'A descrição deve ter no máximo 500 caracteres')
        .optional(),
});

export const pillarCriteriaFormSchema = z.object({
    criteria: z.array(criterionSchema),
});

export type PillarCriteriaFormValues = z.infer<typeof pillarCriteriaFormSchema>;
