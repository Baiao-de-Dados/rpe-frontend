import { z } from 'zod';

export const CriterionSchema = z
    .object({
        id: z.string(),
        name: z.string(),
        isActive: z.boolean(),
        weight: z.string().optional(),
    })
    .superRefine((val, ctx) => {
        if (val.isActive) {
            if (!val.weight || val.weight === '') {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Peso é obrigatório para critérios ativos',
                    path: ['weight'],
                });
            } else if (!/^[0-9]+$/.test(val.weight)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Peso deve ser um número inteiro positivo',
                    path: ['weight'],
                });
            } else if (Number(val.weight) < 1) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Peso mínimo para critérios ativos é 1',
                    path: ['weight'],
                });
            }
        }
    });

export const PillarSchema = z.object({
    id: z.string(),
    title: z.string(),
    criteria: z.array(CriterionSchema).refine(
        criteria => {
            const active = criteria.filter(c => c.isActive);
            if (active.length === 0) return true;
            const sum = active.reduce(
                (acc, c) => acc + (c.weight ? Number(c.weight) : 0),
                0,
            );
            return sum === 100;
        },
        {
            message:
                'A soma dos pesos dos critérios ativos em um pilar deve ser exatamente 100%',
        },
    ),
});

export const TrackSchema = z
    .object({
        id: z.string(),
        title: z.string(),
        pillars: z.array(PillarSchema),
    })
    .superRefine((track, ctx) => {
        const allActiveCriteria = track.pillars.flatMap(pillar =>
            pillar.criteria.filter(c => c.isActive),
        );
        if (allActiveCriteria.length < 12) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Cada trilha deve ter no mínimo 12 critérios ativos',
                path: ['pillars'],
            });
        }
        if (allActiveCriteria.length > 17) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Cada trilha deve ter no máximo 17 critérios ativos',
                path: ['pillars'],
            });
        }
    });

export const TrackSectionSchema = z.object({
    tracks: z.array(TrackSchema),
});

export type TrackSectionFormType = z.infer<typeof TrackSectionSchema>;
