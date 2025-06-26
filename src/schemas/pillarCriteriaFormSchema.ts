import * as z from 'zod';

export const criterionSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Nome obrigatório'),
    description: z.string().optional(),
});

export const pillarCriteriaFormSchema = z.object({
    criteria: z.array(criterionSchema),
});

export type PillarCriteriaFormValues = z.infer<typeof pillarCriteriaFormSchema>;
