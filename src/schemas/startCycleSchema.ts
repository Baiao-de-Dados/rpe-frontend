import { z } from 'zod';

export const getStartCycleSchema = (minDate: string, maxDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];
    return z.object({
        startDate: z
            .string()
            .min(1, 'Selecione uma data de início')
            .refine(date => date >= minDate && date <= maxDate, {
                message: `Data fora do semestre`,
            })
            .refine(date => date >= todayStr, {
                message: 'Data anterior a hoje',
            }),
        endDate: z
            .string()
            .min(1, 'Selecione uma data de término')
            .refine(date => date >= minDate && date <= maxDate, {
                message: `Data fora do semestre`,
            })
            .refine(date => date >= todayStr, {
                message: 'Data anterior a hoje',
            }),
    }).superRefine((data, ctx) => {
        if (data.endDate < data.startDate) {
            ctx.addIssue({
                path: ['endDate'],
                code: z.ZodIssueCode.custom,
                message: 'Término deve ser posterior ao início',
            });
        }
        if (data.endDate === data.startDate) {
            ctx.addIssue({
                path: ['endDate'],
                code: z.ZodIssueCode.custom,
                message: 'As datas não podem ser iguais',
            });
        }
    });
};

export type StartCycleSchema = {
    startDate: string;
    endDate: string;
};
