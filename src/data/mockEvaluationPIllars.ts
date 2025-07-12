export interface Criterion {
    id: number;
    nome: string;
    descricao: string;
    rating?: number;
    justification?: string;
}

export interface Pillar {
    id: number;
    titulo: string;
    criterios: Criterion[];
}

export interface EvaluationPillars {
    comportamento: Pillar;
    execucao: Pillar;
    gestaoLideranca: Pillar;
}

export const mockEvaluationPillars: EvaluationPillars = {
    comportamento: {
        id: 1,
        titulo: 'Comportamento',
        criterios: [
            {
                id: 1,
                nome: 'Sentimento de Dono',
                descricao: 'Demonstra responsabilidade e ownership sobre suas tarefas e resultados',
            },
            {
                id: 2,
                nome: 'Resiliência nas adversidades',
                descricao: 'Mantém foco e determinação diante de desafios e obstáculos',
            },
            {
                id: 3,
                nome: 'Organização no Trabalho',
                descricao: 'Estrutura suas atividades de forma eficiente e sistemática',
            },
            {
                id: 4,
                nome: 'Capacidade de aprender',
                descricao: 'Busca continuamente novos conhecimentos e desenvolve suas habilidades',
            },
            {
                id: 5,
                nome: 'Ser "team player"',
                descricao: 'Colabora efetivamente e contribui para o sucesso da equipe',
            },
        ],
    },
    execucao: {
        id: 2,
        titulo: 'Execução',
        criterios: [
            {
                id: 6,
                nome: 'Entregar com qualidade',
                descricao: 'Produz trabalho que atende ou supera os padrões de qualidade esperados',
            },
            {
                id: 7,
                nome: 'Atender aos prazos',
                descricao: 'Cumpre consistentemente os cronogramas estabelecidos',
            },
            {
                id: 8,
                nome: 'Fazer mais com menos',
                descricao: 'Otimiza recursos e encontra soluções eficientes',
            },
            {
                id: 9,
                nome: 'Pensar fora da caixa',
                descricao: 'Propõe soluções criativas e abordagens inovadoras',
            },
        ],
    },
    gestaoLideranca: {
        id: 3,
        titulo: 'Gestão e Liderança',
        criterios: [
            {
                id: 10,
                nome: 'Gente',
                descricao: 'Desenvolve, motiva e orienta pessoas para alcançar seu potencial',
            },
            {
                id: 11,
                nome: 'Resultados',
                descricao: 'Entrega resultados consistentes e impacta positivamente os objetivos',
            },
            {
                id: 12,
                nome: 'Evolução da Rocket Corp',
                descricao: 'Contribui estrategicamente para o crescimento e evolução da empresa',
            },
        ],
    },
};

export const getAllCriteria = (): Criterion[] => {
    return [
        ...mockEvaluationPillars.comportamento.criterios,
        ...mockEvaluationPillars.execucao.criterios,
        ...mockEvaluationPillars.gestaoLideranca.criterios,
    ];
};

export const getCriteriaByPillar = (
    pillar: keyof EvaluationPillars,
): Criterion[] => {
    return mockEvaluationPillars[pillar].criterios;
};

export const getCriterionById = (id: number): Criterion | undefined => {
    return getAllCriteria().find(criterion => criterion.id === id);
};