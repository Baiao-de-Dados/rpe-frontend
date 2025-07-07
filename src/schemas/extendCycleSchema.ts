import { z } from 'zod';

export const getExtendCycleSchema = (minDate: string, maxDate: string, currentEndDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];
    return z.object({
        endDate: z
            .string()
            .min(1, 'Selecione uma nova data de término')
            .refine(date => date >= minDate && date <= maxDate, {
                message: `Data fora do semestre`,
            })
            .refine(date => date >= todayStr, {
                message: 'Data anterior a hoje',
            })
            .refine(date => date !== currentEndDate, {
                message: 'A nova data deve ser diferente',
            }),
    });
};

export type ExtendCycleSchema = z.infer<ReturnType<typeof getExtendCycleSchema>>;
