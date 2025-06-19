import { useState, useMemo, useCallback } from 'react';
import Typography from '../components/Typography';
import Button from '../components/Button';
import SelfAssessment from '../components/EvaluationCards/SelfAssessment';
import SearchBar from '../components/Searchbar';
import CollaboratorCard from '../components/CollaboratorCard';
import CollaboratorEvaluation360 from '../components/EvaluationCards/Evaluation360';
import RatingDisplay from '../components/RatingDisplay';
import MentoringCard from '../components/EvaluationCards/MentoringCard';
import CardContainer from '../components/CardContainer';
import ReferenceCard from '../components/EvaluationCards/ReferenceCard';
import {
    mockEvaluationPillars,
    type Criterion,
} from '../data/mockEvaluationPIllars';
import {
    searchCollaborators,
    type Collaborator,
    type CollaboratorEvaluation,
} from '../data/mockCollaborators';

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

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCollaborators, setSelectedCollaborators] = useState<
        Collaborator[]
    >([]);
    const [collaboratorEvaluations, setCollaboratorEvaluations] = useState<
        Record<string, CollaboratorEvaluation>
    >({});

    const isFormComplete = false; // Mude para true quando quiser ativar o botão

    // Controla quais seções têm notificações (bolinhas vermelhas)
    const sectionsWithNotifications = ['Autoavaliação', 'Avaliação 360']; // Mude aqui para adicionar/remover notificações

    const handleNavClick = useCallback((section: string) => {
        setActiveSection(section);
    }, []);

    const addCollaborator = useCallback((collaborator: Collaborator) => {
        setSelectedCollaborators(prev => [...prev, collaborator]);
        setCollaboratorEvaluations(prev => ({
            ...prev,
            [collaborator.id]: {
                collaboratorId: collaborator.id,
                ratings: {},
                pontosFortes: '',
                pontosMelhoria: '',
            },
        }));
    }, []);

    const removeCollaboratorFromEvaluation = useCallback(
        (collaboratorId: string) => {
            setSelectedCollaborators(prev =>
                prev.filter(c => c.id !== collaboratorId),
            );
            setCollaboratorEvaluations(prev => {
                const newEvaluations = { ...prev };
                delete newEvaluations[collaboratorId];
                return newEvaluations;
            });
        },
        [],
    );

    const updateCollaboratorRating = useCallback(
        (collaboratorId: string, rating: number | null) => {
            setCollaboratorEvaluations(prev => ({
                ...prev,
                [collaboratorId]: {
                    ...prev[collaboratorId],
                    ratings: {
                        ...prev[collaboratorId]?.ratings,
                        general: rating || 0,
                    },
                },
            }));
        },
        [],
    );

    const updateCollaboratorField = useCallback(
        (
            collaboratorId: string,
            field: 'pontosFortes' | 'pontosMelhoria',
            value: string,
        ) => {
            setCollaboratorEvaluations(prev => ({
                ...prev,
                [collaboratorId]: {
                    ...prev[collaboratorId],
                    [field]: value,
                },
            }));
        },
        [],
    );

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

    const handleClearReference = removeCollaboratorFromEvaluation;

    const handleFieldChange = (
        collaboratorId: string,
        field: 'referencia',
        value: string,
    ) => {
        setCollaboratorEvaluations(prev => ({
            ...prev,
            [collaboratorId]: {
                ...prev[collaboratorId],
                [field]: value,
            },
        }));
    };

    const referenceHandlers = useMemo(() => {
        const handlers: Record<string, (value: string) => void> = {};
        selectedCollaborators.forEach(collaborator => {
            handlers[collaborator.id] = value =>
                handleFieldChange(collaborator.id, 'referencia', value);
        });
        return handlers;
    }, [selectedCollaborators, handleFieldChange]);

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
                                ([, pillar]) => {
                                    const stats = pillarStats[pillar.titulo];
                                    return (
                                        <CardContainer className="pt-14 p-10 mb-5">
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
                                                    <RatingDisplay
                                                        rating={
                                                            pillarAverages[
                                                                pillar.titulo
                                                            ]?.toFixed(1) || '-'
                                                        }
                                                    ></RatingDisplay>
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
                                                            <SelfAssessment
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
                                        </CardContainer>
                                    );
                                },
                            )}
                        </div>
                    </section>
                )}
                {activeSection === 'Avaliação 360' && (
                    <section>
                        <div className="mb-8">
                            <div className="mb-6 relative">
                                <SearchBar<Collaborator>
                                    value={searchQuery}
                                    onChange={setSearchQuery}
                                    placeholder="Buscar por colaboradores"
                                    className="w-full"
                                    searchFunction={searchCollaborators}
                                    onItemSelect={addCollaborator}
                                    renderItem={collaborator => (
                                        <CollaboratorCard
                                            collaborator={collaborator}
                                            variant="compact"
                                        />
                                    )}
                                    excludeItems={selectedCollaborators}
                                    getItemKey={collaborator => collaborator.id}
                                    noResultsMessage="Nenhum colaborador encontrado"
                                />
                            </div>
                        </div>

                        {selectedCollaborators.length > 0 && (
                            <div className="space-y-6">
                                {selectedCollaborators.map(collaborator => {
                                    const evaluation =
                                        collaboratorEvaluations[
                                            collaborator.id
                                        ];
                                    return (
                                        <CollaboratorEvaluation360
                                            key={collaborator.id}
                                            collaborator={collaborator}
                                            evaluation={evaluation}
                                            onClearEvaluation={
                                                removeCollaboratorFromEvaluation
                                            }
                                            onRatingChange={
                                                updateCollaboratorRating
                                            }
                                            onFieldChange={
                                                updateCollaboratorField
                                            }
                                        />
                                    );
                                })}
                            </div>
                        )}
                        {selectedCollaborators.length === 0 && (
                            <div className="text-center py-12">
                                <Typography
                                    variant="body"
                                    className="text-gray-500"
                                >
                                    Busque um colaborador para começar a
                                    Avaliação 360
                                </Typography>
                            </div>
                        )}
                    </section>
                )}
                {activeSection === 'Mentoring' && (
                    <section>
                        <MentoringCard />
                    </section>
                )}
                {activeSection === 'Referências' && (
                    <section>
                        <div className="mb-8">
                            <div className="mb-6 relative">
                                <SearchBar<Collaborator>
                                    value={searchQuery}
                                    onChange={setSearchQuery}
                                    placeholder="Buscar por colaboradores"
                                    className="w-full"
                                    searchFunction={searchCollaborators}
                                    onItemSelect={addCollaborator}
                                    renderItem={collaborator => (
                                        <CollaboratorCard
                                            collaborator={collaborator}
                                            variant="compact"
                                        />
                                    )}
                                    excludeItems={selectedCollaborators}
                                    getItemKey={collaborator => collaborator.id}
                                    noResultsMessage="Nenhum colaborador encontrado"
                                />
                            </div>
                        </div>

                        {selectedCollaborators.length > 0 && (
                            <div className="space-y-6">
                                {selectedCollaborators.map(collaborator => {
                                    const evaluation =
                                        collaboratorEvaluations[
                                            collaborator.id
                                        ];
                                    return (
                                        <ReferenceCard
                                            key={collaborator.id}
                                            collaborator={collaborator}
                                            evaluation={evaluation}
                                            onClearReference={
                                                handleClearReference
                                            }
                                            onFieldChange={
                                                referenceHandlers[
                                                    collaborator.id
                                                ]
                                            }
                                        />
                                    );
                                })}
                            </div>
                        )}
                        {selectedCollaborators.length === 0 && (
                            <div className="text-center py-12">
                                <Typography
                                    variant="body"
                                    className="text-gray-500"
                                >
                                    Busque um colaborador para começar a seção
                                    de Referências
                                </Typography>
                            </div>
                        )}
                    </section>
                )}
            </main>
        </>
    );
}
