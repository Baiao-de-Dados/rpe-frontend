import { z } from 'zod';

export const addCriterionSchema = z.object({
    name: z
        .string()
        .min(1, 'O nome é obrigatório')
        .max(100, 'O nome deve ter no máximo 100 caracteres'),
    description: z
        .string()
        .max(500, 'A descrição deve ter no máximo 500 caracteres')
        .optional(),
});

export type AddCriterionFormValues = z.infer<typeof addCriterionSchema>;
