import { z } from 'zod';

export const getStartCycleSchema = (minDate: string, maxDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];
    return z.object({
        endDate: z
            .string()
            .min(1, 'Selecione uma data de término')
            .refine(date => date >= minDate && date <= maxDate, {
                message: `Data fora do semestre`,
            })
            .refine(date => date >= todayStr, {
                message: 'Data anterior a hoje',
            }),
    });
};

export type StartCycleSchema = z.infer<ReturnType<typeof getStartCycleSchema>>;
