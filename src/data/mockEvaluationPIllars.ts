export interface Criterion {
    id: string;
    nome: string;
    descricao: string;
    rating?: number;
    justification?: string;
}

export interface Pillar {
    id: string;
    titulo: string;
    criterios: Criterion[];
}

export interface EvaluationPillars {
    gestaoLideranca: Pillar;
    teste: Pillar
}

export const mockEvaluationPillars: EvaluationPillars = {
    gestaoLideranca: {
        id: '12',
        titulo: 'Gestão e Liderança',
        criterios: [
            {
                id: 'gente',
                nome: 'Gente',
                descricao:
                    'Desenvolve, motiva e orienta pessoas para alcançar seu potencial',
            },
            {
                id: 'criativa',
                nome: 'Mente criativa',
                descricao:
                    'Busca soluções inovadoras e criativas para problemas',
            },
        ],
    },
    teste: {
        id: '13',
        titulo: 'Sentimento de dono',
        criterios: [
            {
                id: 'pensamento',
                nome: 'Pensamento empreendedor',
                descricao:
                    'Gosta de negócios',
            },
            {
                id: 'crescimento',
                nome: 'Crescimento da empresa',
                descricao:
                    'Busca crescimento e desenvolvimento da empresa',
            },
        ],
    },
};

export const getAllCriteria = (): Criterion[] => {
    return [
        ...mockEvaluationPillars.gestaoLideranca.criterios,
    ];
};

export const getCriteriaByPillar = (
    pillar: keyof EvaluationPillars,
): Criterion[] => {
    return mockEvaluationPillars[pillar].criterios;
};

export const getCriterionById = (id: string): Criterion | undefined => {
    return getAllCriteria().find(criterion => criterion.id === id);
};
