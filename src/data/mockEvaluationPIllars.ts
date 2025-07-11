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
    comportamento: Pillar;
    execucao: Pillar;
    gestaoLideranca: Pillar;
}

export const mockEvaluationPillars: EvaluationPillars = {
    comportamento: {
        id: '10',
        titulo: 'Comportamento',
        criterios: [
            {
                id: 'sentimento-dono',
                nome: 'Sentimento de Dono',
                descricao:
                    'Demonstra responsabilidade e ownership sobre suas tarefas e resultados',
            },
            {
                id: 'resiliencia',
                nome: 'Resiliência nas adversidades',
                descricao:
                    'Mantém foco e determinação diante de desafios e obstáculos',
            },
            {
                id: 'organizacao',
                nome: 'Organização no Trabalho',
                descricao:
                    'Estrutura suas atividades de forma eficiente e sistemática',
            },
            {
                id: 'aprendizado',
                nome: 'Capacidade de aprender',
                descricao:
                    'Busca continuamente novos conhecimentos e desenvolve suas habilidades',
            },
            {
                id: 'team-player',
                nome: 'Ser "team player"',
                descricao:
                    'Colabora efetivamente e contribui para o sucesso da equipe',
            },
        ],
    },
    execucao: {
        id: '11',
        titulo: 'Execução',
        criterios: [
            {
                id: 'qualidade',
                nome: 'Entregar com qualidade',
                descricao:
                    'Produz trabalho que atende ou supera os padrões de qualidade esperados',
            },
            {
                id: 'prazos',
                nome: 'Atender aos prazos',
                descricao:
                    'Cumpre consistentemente os cronogramas estabelecidos',
            },
            {
                id: 'eficiencia',
                nome: 'Fazer mais com menos',
                descricao: 'Otimiza recursos e encontra soluções eficientes',
            },
            {
                id: 'inovacao',
                nome: 'Pensar fora da caixa',
                descricao: 'Propõe soluções criativas e abordagens inovadoras',
            },
        ],
    },
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
                id: 'resultados',
                nome: 'Resultados',
                descricao:
                    'Entrega resultados consistentes e impacta positivamente os objetivos',
            },
            {
                id: 'evolucao-rocket',
                nome: 'Evolução da Rocket Corp',
                descricao:
                    'Contribui estrategicamente para o crescimento e evolução da empresa',
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

export const getCriterionById = (id: string): Criterion | undefined => {
    return getAllCriteria().find(criterion => criterion.id === id);
};