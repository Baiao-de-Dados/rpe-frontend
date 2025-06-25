const defaultCriteria = {
    comportamento: [
        { id: 'sentimento_dono', name: 'Sentimento de Dono' },
        { id: 'resiliencia', name: 'Resiliencia nas adversidades' },
        { id: 'organizacao', name: 'Organização no Trabalho' },
        { id: 'aprender', name: 'Capacidade de aprender' },
        { id: 'team_player', name: 'Ser "team player"' },
    ],
    execucao: [
        { id: 'qualidade', name: 'Entregar com qualidade' },
        { id: 'prazos', name: 'Atender aos prazos' },
        { id: 'mais_menos', name: 'Fazer mais com menos' },
        { id: 'fora_caixa', name: 'Pensar fora da caixa' },
    ],
    gestao: [
        { id: 'gente', name: 'Gente' },
        { id: 'resultados', name: 'Resultados' },
        { id: 'evolucao', name: 'Evolução da Rocket Corp' },
    ],
};

const defaultSections = [
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
        sections: defaultSections,
    },
    {
        id: 'design',
        title: 'Design',
        sections: defaultSections,
    },
];
