import { z } from 'zod';

export const addPillarSchema = z.object({
    name: z
        .string()
        .min(1, 'O nome é obrigatório')
        .max(100, 'O nome deve ter no máximo 100 caracteres'),
});

export type AddPillarFormValues = z.infer<typeof addPillarSchema>;
