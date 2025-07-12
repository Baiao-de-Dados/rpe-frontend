// Mock data para simulação da autoavaliação do colaborador
export const mockCollaboratorSelfAssessment = {
    1: [
        // Comportamento
        { pilarId: 10, criterionId: 1, rating: 4, justification: 'Sempre demonstro responsabilidade pelas minhas tarefas e busco soluções quando surgem problemas. Assumo ownership dos resultados e me comprometo com os objetivos da equipe.' },
        { pilarId: 10, criterionId: 2, rating: 4, justification: 'Mantenho o foco e determinação mesmo diante de desafios complexos. Aprendo com os obstáculos e busco sempre melhorar minha abordagem.' },
        { pilarId: 10, criterionId: 3, rating: 3, justification: 'Organizo bem minhas atividades e uso ferramentas para gerenciar meu tempo. Ainda posso melhorar na priorização de tarefas mais complexas.' },
        { pilarId: 10, criterionId: 4, rating: 5, justification: 'Busco constantemente aprender novas tecnologias e metodologias. Participo de cursos, leio documentações e sempre peço feedback para melhorar.' },
        { pilarId: 10, criterionId: 5, rating: 4, justification: 'Colaboro ativamente com a equipe, ajudo colegas quando necessário e contribuo para um ambiente de trabalho positivo.' },
        // Execução
        { pilarId: 11, criterionId: 6, rating: 4, justification: 'Entrego trabalho com qualidade, sempre testando e revisando antes de finalizar. Busco seguir as melhores práticas e padrões estabelecidos.' },
        { pilarId: 11, criterionId: 7, rating: 4, justification: 'Cumpro consistentemente os prazos estabelecidos, e quando há risco de atraso, comunico antecipadamente para buscar soluções.' },
        { pilarId: 11, criterionId: 8, rating: 3, justification: 'Busco otimizar meus processos e encontrar soluções eficientes, mas ainda posso melhorar na automação de algumas tarefas.' },
        { pilarId: 11, criterionId: 9, rating: 4, justification: 'Proponho soluções criativas e novas abordagens para problemas. Gosto de experimentar novas tecnologias e metodologias.' },
        // Gestão e Liderança
        { pilarId: 12, criterionId: 10, rating: 3, justification: 'Ainda estou desenvolvendo minhas habilidades de liderança. Ajudo novos membros da equipe e compartilho conhecimento quando possível.' },
        { pilarId: 12, criterionId: 11, rating: 4, justification: 'Entrego resultados consistentes e impacto positivo nos projetos. Foco sempre nos objetivos e métricas estabelecidas.' },
        { pilarId: 12, criterionId: 12, rating: 4, justification: 'Contribuo ativamente para o crescimento da empresa através de melhorias nos processos e sugestões de inovações.' }
    ],
    2: [
        // Comportamento
        { pilarId: 10, criterionId: 1, rating: 3, justification: 'Assumo responsabilidade pelas minhas tarefas, mas ainda posso melhorar na proatividade para antecipar problemas.' },
        { pilarId: 10, criterionId: 2, rating: 4, justification: 'Mantenho-me focado mesmo diante de dificuldades e aprendo com os desafios enfrentados.' },
        { pilarId: 10, criterionId: 3, rating: 4, justification: 'Organizo bem meu trabalho e uso metodologias para gerenciar minhas atividades de forma eficiente.' },
        { pilarId: 10, criterionId: 4, rating: 5, justification: 'Sou muito dedicado ao aprendizado contínuo, sempre buscando cursos e certificações para evoluir.' },
        { pilarId: 10, criterionId: 5, rating: 3, justification: 'Colaboro com a equipe, mas ainda posso melhorar na comunicação e no compartilhamento de conhecimento.' },
        // Execução
        { pilarId: 11, criterionId: 6, rating: 4, justification: 'Entrego trabalho com boa qualidade, sempre revisando e testando antes de finalizar.' },
        { pilarId: 11, criterionId: 7, rating: 3, justification: 'Geralmente cumpro os prazos, mas às vezes subestimo a complexidade de algumas tarefas.' },
        { pilarId: 11, criterionId: 8, rating: 3, justification: 'Busco ser eficiente, mas ainda posso otimizar melhor meus processos de trabalho.' },
        { pilarId: 11, criterionId: 9, rating: 4, justification: 'Gosto de pensar em soluções criativas e buscar novas formas de resolver problemas.' },
        // Gestão e Liderança
        { pilarId: 12, criterionId: 10, rating: 2, justification: 'Ainda estou no início do desenvolvimento das minhas habilidades de liderança e gestão de pessoas.' },
        { pilarId: 12, criterionId: 11, rating: 3, justification: 'Entrego os resultados esperados, mas ainda posso melhorar no impacto dos mesmos.' },
        { pilarId: 12, criterionId: 12, rating: 3, justification: 'Contribuo para a empresa dentro do meu escopo, mas posso ampliar minha visão estratégica.' }
    ]
};

export const getCollaboratorSelfAssessment = (collaboratorId: number) => {
    return mockCollaboratorSelfAssessment[collaboratorId as keyof typeof mockCollaboratorSelfAssessment] || [];
};
