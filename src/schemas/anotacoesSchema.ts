import { z } from 'zod';

export const anotacoesSchema = z.object({
    text: z
    .string()
    .min(1, 'As anotações não podem estar vazias')
});

export type AnotacoesFormData = z.infer<typeof anotacoesSchema>;
