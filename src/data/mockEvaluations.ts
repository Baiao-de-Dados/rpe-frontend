// Tipos para cada parte do mock
export interface PillarCriteria {
    criteriaName: string;
    rating: number;
    finalRating: number;
    justification: string;
}

export interface Pillar {
    pillarName: string;
    criteria: PillarCriteria[];
}

export interface SelfAssessment {
    pillars: Pillar[];
}

export interface Evaluation360Item {
    collaratorName: string;
    collaboratorPosition: string;
    rating: number;
    improvements: string;
    strengths: string;
}

export interface Evaluation360 {
    evaluation: Evaluation360Item[];
}

export interface ReferenceItem {
    collaratorName: string;
    collaboratorPosition: string;
    justification: string;
}

export interface Mentoring {
    mentorName: string;
    rating: number;
    justification: string;
}

export interface Cycle {
    cycleName: string;
    selfAssessment: SelfAssessment;
    evaluation360: Evaluation360;
    reference: ReferenceItem[];
    mentoring: Mentoring;
}

export interface MockEvaluations {
    cycles: Cycle[];
}

export default {
    cycles: [
        {
            cycleName: "2023.2",
            selfAssessment: {
                pillars: [
                    {
                        pillarName: "Habilidades Técnicas",
                        criteria: [
                            {
                                criteriaName: "Qualidade de Código",
                                rating: 4,
                                finalRating: 4,
                                justification: "Entrega consistente de código limpo e funcional."
                            },
                            {
                                criteriaName: "Boas Práticas",
                                rating: 5,
                                finalRating: 5,
                                justification: "Seguiu padrões de projeto e boas práticas de forma exemplar."
                            }
                        ]
                    },
                    {
                        pillarName: "Relacionamento Interpessoal",
                        criteria: [
                            {
                                criteriaName: "Trabalho em Equipe",
                                rating: 4,
                                finalRating: 4,
                                justification: "Colaborou bem com colegas e apoiou decisões em grupo."
                            }
                        ]
                    }
                ]
            },
            evaluation360: {
                evaluation: [
                    {
                        collaratorName: "Alice Santos",
                        collaboratorPosition: "Tech Lead",
                        rating: 4,
                        improvements: "Aprimorar clareza na comunicação técnica.",
                        strengths: "Boa disposição para aprender e colaborar."
                    },
                    {
                        collaratorName: "Marcos Lima",
                        collaboratorPosition: "Desenvolvedor Sênior",
                        rating: 5,
                        improvements: "Pode se envolver mais nas decisões arquiteturais.",
                        strengths: "Código sempre bem estruturado e testado."
                    }
                ]
            },
            reference: [
                {
                    collaratorName: "Alice Santos",
                    collaboratorPosition: "Tech Lead",
                    justification: "Demonstra comprometimento e evolução contínua."
                },
                {
                    collaratorName: "Marcos Lima",
                    collaboratorPosition: "Desenvolvedor Sênior",
                    justification: "Pessoa confiável para resolver problemas técnicos complexos."
                }
            ],
            mentoring: {
                mentorName: "Desconhecido",
                rating: 4,
                justification: "Recebeu boas orientações que ajudaram na organização de tarefas."
            }
        },
        {
            cycleName: "2024.1",
            selfAssessment: {
                pillars: [
                    {
                        pillarName: "Comunicação",
                        criteria: [
                            {
                                criteriaName: "Clareza e Objetividade",
                                rating: 5,
                                finalRating: 5,
                                justification: "Conseguiu expressar ideias com clareza em reuniões e documentação."
                            },
                            {
                                criteriaName: "Feedback",
                                rating: 4,
                                finalRating: 4,
                                justification: "Deu e recebeu feedbacks de forma construtiva."
                            }
                        ]
                    },
                    {
                        pillarName: "Proatividade",
                        criteria: [
                            {
                                criteriaName: "Iniciativa",
                                rating: 5,
                                finalRating: 5,
                                justification: "Tomou frente em iniciativas importantes no time."
                            }
                        ]
                    }
                ]
            },
            evaluation360: {
                evaluation: [
                    {
                        collaratorName: "Bruno Mendes",
                        collaboratorPosition: "Product Owner",
                        rating: 4,
                        improvements: "Pode antecipar mais possíveis riscos nos projetos.",
                        strengths: "Participativo e centrado na entrega de valor."
                    },
                    {
                        collaratorName: "Renata Carvalho",
                        collaboratorPosition: "Scrum Master",
                        rating: 5,
                        improvements: "Apenas manter o bom desempenho atual.",
                        strengths: "Excelente comunicação e visão sistêmica do projeto."
                    }
                ]
            },
            reference: [
                {
                    collaratorName: "Bruno Mendes",
                    collaboratorPosition: "Product Owner",
                    justification: "Tem iniciativa e senso de dono nos projetos em que atua."
                },
                {
                    collaratorName: "Renata Carvalho",
                    collaboratorPosition: "Scrum Master",
                    justification: "Demonstra forte alinhamento com os objetivos do time."
                }
            ],
            mentoring: {
                mentorName: "Desconhecido",
                rating: 5,
                justification: "Mentoria foi essencial para meu desenvolvimento de soft skills."
            }
        },
        {
            cycleName: "2024.2",
            selfAssessment: {
                pillars: [
                    {
                        pillarName: "Entrega",
                        criteria: [
                            {
                                criteriaName: "Comprometimento com Prazos",
                                rating: 5,
                                finalRating: 5,
                                justification: "Todas as entregas foram realizadas dentro do prazo com qualidade."
                            },
                            {
                                criteriaName: "Autonomia",
                                rating: 4,
                                finalRating: 4,
                                justification: "Executou atividades complexas com pouca supervisão."
                            }
                        ]
                    },
                    {
                        pillarName: "Inovação",
                        criteria: [
                            {
                                criteriaName: "Criatividade em Soluções",
                                rating: 5,
                                finalRating: 5,
                                justification: "Sugeriu melhorias significativas em processos internos."
                            }
                        ]
                    }
                ]
            },
            evaluation360: {
                evaluation: [
                    {
                        collaratorName: "John Doe",
                        collaboratorPosition: "Manager",
                        rating: 4,
                        improvements: "Melhorar visibilidade sobre o que está sendo feito.",
                        strengths: "Responsável, produtivo e focado em resultados."
                    },
                    {
                        collaratorName: "Isabela Martins",
                        collaboratorPosition: "Analista de Qualidade",
                        rating: 5,
                        improvements: "Poderia compartilhar mais conhecimento com o time.",
                        strengths: "Traz soluções criativas e bem embasadas."
                    }
                ]
            },
            reference: [
                {
                    collaratorName: "John Doe",
                    collaboratorPosition: "Manager",
                    justification: "Tem se destacado na entrega de valor técnico e em inovação."
                },
                {
                    collaratorName: "Isabela Martins",
                    collaboratorPosition: "Analista de Qualidade",
                    justification: "A parceria no time foi fluida e com bons resultados."
                }
            ],
            mentoring: {
                mentorName: "Desconhecido",
                rating: 4,
                justification: "Recebi suporte técnico e orientação para priorização de tarefas."
            }
        },
        {
            cycleName: "2025.1",
            selfAssessment: {
                pillars: [
                    {
                        pillarName: "Liderança",
                        criteria: [
                            {
                                criteriaName: "Influência no Time",
                                rating: 4,
                                finalRating: 4,
                                justification: "Conduziu reuniões técnicas e tomou decisões assertivas."
                            },
                            {
                                criteriaName: "Desenvolvimento de Pessoas",
                                rating: 5,
                                finalRating: 5,
                                justification: "Mentorou colegas e ajudou no crescimento do time."
                            }
                        ]
                    },
                    {
                        pillarName: "Qualidade",
                        criteria: [
                            {
                                criteriaName: "Testes Automatizados",
                                rating: 5,
                                finalRating: 5,
                                justification: "Cobertura de testes aumentou significativamente."
                            }
                        ]
                    }
                ]
            },
            evaluation360: {
                evaluation: [
                    {
                        collaratorName: "Carla Nunes",
                        collaboratorPosition: "Team Leader",
                        rating: 5,
                        improvements: "Apenas continuar com a mesma dedicação.",
                        strengths: "Demonstra liderança natural e grande empatia com o time."
                    },
                    {
                        collaratorName: "João Batista",
                        collaboratorPosition: "Engenheiro de Software",
                        rating: 4,
                        improvements: "Delegar mais quando possível.",
                        strengths: "Capacidade analítica e senso de responsabilidade fortes."
                    }
                ]
            },
            reference: [
                {
                    collaratorName: "Carla Nunes",
                    collaboratorPosition: "Team Leader",
                    justification: "Liderou projetos desafiadores com sucesso e consistência."
                },
                {
                    collaratorName: "João Batista",
                    collaboratorPosition: "Engenheiro de Software",
                    justification: "Referência técnica no time, sempre disposto a ajudar."
                }
            ],
            mentoring: {
                mentorName: "Desconhecido",
                rating: 5,
                justification: "Mentoria com foco em carreira e crescimento técnico fez toda diferença."
            }
        }
    ]
};
