import { useState, useMemo, useCallback } from 'react';
import Typography from '../components/Typography';
import Button from '../components/Button';
import Topic from '../components/Topic';
import {
    mockEvaluationPillars,
    type Criterion,
} from '../data/mockEvaluationPIllars';

const sections = ['Autoavaliação', 'Avaliação 360', 'Mentoring', 'Referências'];

interface CriterionEvaluation {
    rating?: number;
    justification?: string;
}

export function Avaliacao() {
    const [activeSection, setActiveSection] = useState('Autoavaliação');
    const [evaluations, setEvaluations] = useState<
        Record<string, CriterionEvaluation>
    >({});
    const isFormComplete = false; // Mude para true quando quiser ativar o botão

    // Controla quais seções têm notificações (bolinhas vermelhas)
    const sectionsWithNotifications = ['Autoavaliação', 'Avaliação 360']; // Mude aqui para adicionar/remover notificações

    const handleNavClick = useCallback((section: string) => {
        setActiveSection(section);
    }, []);

    const updateEvaluation = useCallback(
        (criterionId: string, evaluation: CriterionEvaluation) => {
            setEvaluations(prev => ({
                ...prev,
                [criterionId]: evaluation,
            }));
        },
        [],
    );

    const completedCriteriaCount = useMemo(() => {
        return Object.values(mockEvaluationPillars).map(pillar => {
            const completedCount = pillar.criterios.filter(
                (criterion: Criterion) => {
                    const evaluation = evaluations[criterion.id];
                    return (
                        evaluation?.rating &&
                        evaluation?.justification &&
                        evaluation.justification.trim() !== ''
                    );
                },
            ).length;
            return {
                pillarTitle: pillar.titulo,
                completedCount,
                totalCount: pillar.criterios.length,
            };
        });
    }, [evaluations]);

    const pillarAverages = useMemo(() => {
        return Object.values(mockEvaluationPillars).reduce(
            (acc, pillar) => {
                const ratings = pillar.criterios
                    .map(
                        (criterion: Criterion) =>
                            evaluations[criterion.id]?.rating,
                    )
                    .filter(
                        (rating: number | undefined): rating is number =>
                            rating !== undefined,
                    );

                const average =
                    ratings.length > 0
                        ? Math.round(
                              (ratings.reduce(
                                  (sum: number, rating: number) => sum + rating,
                                  0,
                              ) /
                                  ratings.length) *
                                  10,
                          ) / 10
                        : null;

                acc[pillar.titulo] = average;
                return acc;
            },
            {} as Record<string, number | null>,
        );
    }, [evaluations]);

    const createEvaluationHandler = useCallback(
        (criterionId: string) => {
            return (rating: number | null, justification: string) =>
                updateEvaluation(criterionId, {
                    rating: rating || undefined,
                    justification,
                });
        },
        [updateEvaluation],
    );

    const evaluationHandlers = useMemo(() => {
        const handlers: Record<
            string,
            (rating: number | null, justification: string) => void
        > = {};
        Object.values(mockEvaluationPillars).forEach(pillar => {
            pillar.criterios.forEach((criterion: Criterion) => {
                handlers[criterion.id] = createEvaluationHandler(criterion.id);
            });
        });
        return handlers;
    }, [createEvaluationHandler]);

    const pillarStats = useMemo(() => {
        return completedCriteriaCount.reduce(
            (acc, item) => {
                acc[item.pillarTitle] = item;
                return acc;
            },
            {} as Record<string, (typeof completedCriteriaCount)[0]>,
        );
    }, [completedCriteriaCount]);

    return (
        <>
            <header className="sticky top-0 z-50 pt-12 pb-0 bg-white flex flex-col justify-between shadow-sm">
                <div className="p-8 flex items-center justify-between">
                    <Typography variant="h1" className="text-4xl font-bold">
                        Ciclo 2025.1
                    </Typography>
                    <div className="flex gap-4 items-center">
                        <Button
                            variant="primary"
                            size="md"
                            disabled={!isFormComplete}
                            className={`transition-all duration-200 ${
                                !isFormComplete
                                    ? 'bg-primary-200 text-primary-400 cursor-not-allowed hover:bg-primary-200'
                                    : 'bg-primary-500 text-white hover:bg-primary-600'
                            }`}
                        >
                            Concluir e enviar
                        </Button>
                    </div>
                </div>
                <nav className="flex space-x-20 mt-2 border-t-3 pt-5 pl-14 bg border-gray-50">
                    {sections.map(section => (
                        <div
                            key={section}
                            className="relative min-w-38 text-center"
                        >
                            <Typography
                                variant="body"
                                className={`cursor-pointer pb-4 pl-5 pr-5 text-primary-600 font-normal relative ${
                                    activeSection === section
                                        ? 'border-b-4 border-primary-500 font-semibold text-primary-500'
                                        : ''
                                }`}
                                onClick={() => handleNavClick(section)}
                            >
                                <span className="invisible font-semibold absolute inset-0">
                                    {section}
                                </span>
                                {section}
                            </Typography>
                            {sectionsWithNotifications.includes(section) && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                            )}
                        </div>
                    ))}
                </nav>
            </header>
            <main className="p-8 pt-6">
                {activeSection === 'Autoavaliação' && (
                    <section>
                        <div className="space-y-8>>">
                            {Object.entries(mockEvaluationPillars).map(
                                ([key, pillar]) => {
                                    const stats = pillarStats[pillar.titulo];
                                    return (
                                        <div
                                            key={key}
                                            className="border mb-5 bg-white border-gray-200 rounded-2xl pt-14 p-10 shadow-sm"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <Typography
                                                        variant="h3"
                                                        color="primary500"
                                                        className="text-xl font-bold"
                                                    >
                                                        Critérios de{' '}
                                                        {pillar.titulo}
                                                    </Typography>
                                                    {stats &&
                                                        stats.completedCount <
                                                            stats.totalCount && (
                                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                                        )}
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="w-10 h-6 text-sm font-medium text-primary-500 bg-gray-200 flex justify-center items-center rounded-sm">
                                                        {pillarAverages[
                                                            pillar.titulo
                                                        ]?.toFixed(1) || '-'}
                                                    </span>
                                                    <Typography
                                                        variant="body"
                                                        className="text-sm text-gray-500"
                                                    >
                                                        {stats?.completedCount ||
                                                            0}{' '}
                                                        de{' '}
                                                        {
                                                            pillar.criterios
                                                                .length
                                                        }{' '}
                                                        critérios concluídos
                                                    </Typography>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                {pillar.criterios.map(
                                                    (
                                                        criterion: Criterion,
                                                        index: number,
                                                    ) => {
                                                        const evaluation =
                                                            evaluations[
                                                                criterion.id
                                                            ] || {};
                                                        return (
                                                            <Topic
                                                                key={
                                                                    criterion.id
                                                                }
                                                                topicNumber={
                                                                    index + 1
                                                                }
                                                                topicName={
                                                                    criterion.nome
                                                                }
                                                                isLast={
                                                                    index ===
                                                                    pillar
                                                                        .criterios
                                                                        .length -
                                                                        1
                                                                }
                                                                rating={
                                                                    evaluation.rating
                                                                }
                                                                justification={
                                                                    evaluation.justification ||
                                                                    ''
                                                                }
                                                                onEvaluationChange={
                                                                    evaluationHandlers[
                                                                        criterion
                                                                            .id
                                                                    ]
                                                                }
                                                            />
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </div>
                                    );
                                },
                            )}
                        </div>
                    </section>
                )}
                {activeSection === 'Avaliação 360' && (
                    <section>
                        <Typography variant="h2">Avaliação 360</Typography>
                        <p>Conteúdo da seção de Avaliação 360.</p>
                    </section>
                )}
                {activeSection === 'Mentoring' && (
                    <section>
                        <Typography variant="h2">Mentoring</Typography>
                        <p>Conteúdo da seção de Mentoring.</p>
                    </section>
                )}
                {activeSection === 'Referências' && (
                    <section>
                        <Typography variant="h2">Referências</Typography>
                        <p>Conteúdo da seção de Referências.</p>
                    </section>
                )}
            </main>
        </>
    );
}
