import { z } from 'zod';

export const selfAssessmentSchema = z.object({
    pilarId: z.number({
        required_error: 'O ID do pilar é obrigatório',
    }),
    criterionId: z.number({
        required_error: 'O ID do critério é obrigatório',
    }),
    rating: z
        .number({
            required_error: 'A nota é obrigatória',
            invalid_type_error: 'A nota deve ser um número',
        })
        .int('A nota deve ser um número inteiro')
        .min(1, 'A nota deve ser entre 1 e 5')
        .max(5, 'A nota deve ser entre 1 e 5')
        .nullable()
        .refine(value => value !== null && value !== 0, 'A nota é obrigatória'),
    justification: z
        .string({
            required_error: 'A justificativa é obrigatória',
        })
        .min(1, 'A justificativa não pode estar vazia')
        .max(1000, 'A justificativa deve ter no máximo 1000 caracteres')
        .trim()
        .refine(
            value => value.length > 0,
            'A justificativa não pode conter apenas espaços em branco',
        ),
    selfAssessmentIAValid: z.boolean({
        required_error: 'Você precisa aceitar ou rejeitar a validação da IA',
    }).refine(v => v === true, 'Você precisa aceitar a validação da IA')
});

export const evaluation360Schema = z.object({
    collaboratorId: z.number({
        required_error: 'O ID do colaborador é obrigatório',
    }),
    rating: z
        .number({
            required_error: 'A nota é obrigatória',
            invalid_type_error: 'A nota deve ser um número',
        })
        .int('A nota deve ser um número inteiro')
        .min(1, 'A nota deve ser entre 1 e 5')
        .max(5, 'A nota deve ser entre 1 e 5')
        .nullable()
        .refine(value => value !== null && value !== 0, 'A nota é obrigatória'),
    strengths: z
        .string({
            required_error: 'Os pontos fortes são obrigatórios',
        })
        .min(1, 'Os pontos fortes não podem estar vazios')
        .max(1000, 'Os pontos fortes devem ter no máximo 1000 caracteres')
        .trim()
        .refine(
            value => value.length > 0,
            'Os pontos fortes não podem conter apenas espaços em branco',
        ),
    improvements: z
        .string({
            required_error: 'Os pontos de melhoria são obrigatórios',
        })
        .min(1, 'Os pontos de melhoria não podem estar vazios')
        .max(1000, 'Os pontos de melhoria devem ter no máximo 1000 caracteres')
        .trim()
        .refine(
            value => value.length > 0,
            'Os pontos de melhoria não podem conter apenas espaços em branco',
        ),
    evaluation360IAValid: z.boolean({
        required_error: 'Você precisa aceitar ou rejeitar a validação da IA',
    }).refine(v => v === true, 'Você precisa aceitar a validação da IA')
});

export const mentoringSchema = z.object({
    mentorId: z.number({
        required_error: 'O ID do mentor é obrigatório',
    }),
    mentoringRating: z
        .number({
            required_error: 'A nota é obrigatória',
            invalid_type_error: 'A nota deve ser um número',
        })
        .int('A nota deve ser um número inteiro')
        .min(1, 'A nota deve ser entre 1 e 5')
        .max(5, 'A nota deve ser entre 1 e 5')
        .nullable()
        .refine(value => value !== null && value !== 0, 'A nota é obrigatória'),
    mentoringJustification: z
        .string({
            required_error: 'A justificativa é obrigatória',
        })
        .min(1, 'A justificativa não pode estar vazia')
        .max(1000, 'A justificativa deve ter no máximo 1000 caracteres')
        .trim()
        .refine(
            value => value.length > 0,
            'A justificativa não pode conter apenas espaços em branco',
        ),
    mentoringIAValid: z.boolean({
        required_error: 'Você precisa aceitar ou rejeitar a validação da IA',
    }).refine(v => v === true, 'Você precisa aceitar a validação da IA')
});

export const referenceSchema = z.object({
    collaboratorId: z.number({
        required_error: 'O ID do colaborador é obrigatório',
    }),
    justification: z
        .string({
            required_error: 'A justificativa é obrigatória',
        })
        .min(1, 'A justificativa não pode estar vazia')
        .max(1000, 'A justificativa deve ter no máximo 1000 caracteres')
        .trim()
        .refine(
            value => value.length > 0,
            'A justificativa não pode conter apenas espaços em branco',
        ),
    referencesIAValid: z.boolean({
        required_error: 'Você precisa aceitar ou rejeitar a validação da IA',
    }).refine(v => v === true, 'Você precisa aceitar a validação da IA')
});

export const fullEvaluationSchema = z.object({
    selfAssessment: z.array(selfAssessmentSchema),
    evaluation360: z.array(evaluation360Schema).min(1, 'Pelo menos uma avaliação 360 é obrigatória'),
    ...mentoringSchema.shape,
    references: z.array(referenceSchema).optional(),
});

export type EvaluationFormData = z.infer<typeof fullEvaluationSchema>;
