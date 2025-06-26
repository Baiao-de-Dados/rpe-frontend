const defaultCriteria = {
    comportamento: [
        {
            id: 'sentimento_dono',
            name: 'Sentimento de Dono',
            description:
                'Demonstra responsabilidade e senso de pertencimento nas tarefas e resultados.',
        },
        {
            id: 'resiliencia',
            name: 'Resiliencia nas adversidades',
            description:
                'Mantém a calma e persevera diante de desafios e mudanças.',
        },
        {
            id: 'organizacao',
            name: 'Organização no Trabalho',
            description:
                'Organiza tarefas, prazos e prioridades de forma eficiente.',
        },
        {
            id: 'aprender',
            name: 'Capacidade de aprender',
            description:
                'Busca aprendizado contínuo e aplica novos conhecimentos.',
        },
        {
            id: 'team_player',
            name: 'Ser "team player"',
            description:
                'Colabora, compartilha e contribui para o sucesso do time.',
        },
    ],
    execucao: [
        {
            id: 'qualidade',
            name: 'Entregar com qualidade',
            description:
                'Entrega resultados com atenção aos detalhes e excelência.',
        },
        {
            id: 'prazos',
            name: 'Atender aos prazos',
            description:
                'Cumpre prazos acordados e gerencia o tempo de forma eficaz.',
        },
        {
            id: 'mais_menos',
            name: 'Fazer mais com menos',
            description:
                'Utiliza recursos de forma inteligente, buscando eficiência.',
        },
        {
            id: 'fora_caixa',
            name: 'Pensar fora da caixa',
            description:
                'Propõe soluções criativas e inovadoras para problemas.',
        },
    ],
    gestao: [
        {
            id: 'gente',
            name: 'Gente',
            description: 'Desenvolve, apoia e inspira pessoas ao redor.',
        },
        {
            id: 'resultados',
            name: 'Resultados',
            description: 'Foca em metas e entrega resultados consistentes.',
        },
        {
            id: 'evolucao',
            name: 'Evolução da Rocket Corp',
            description: 'Contribui para o crescimento e evolução da empresa.',
        },
    ],
};

const defaultPillars = [
    {
        id: 'comportamento',
        title: 'Comportamento',
        criteria: defaultCriteria.comportamento,
    },
    { id: 'execucao', title: 'Execução', criteria: defaultCriteria.execucao },
    {
        id: 'gestao',
        title: 'Gestão e Liderança',
        criteria: defaultCriteria.gestao,
    },
];

export const mockTracks = [
    {
        id: 'financeiro',
        title: 'Financeiro',
        pillars: defaultPillars,
    },
    {
        id: 'design',
        title: 'Design',
        pillars: defaultPillars,
    },
];
