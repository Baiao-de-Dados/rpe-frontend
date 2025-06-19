import { useState, useMemo, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Typography from '../components/Typography';
import Button from '../components/Button';
import SelfAssessment from '../components/EvaluationCards/SelfAssessment';
import SearchBar from '../components/Searchbar';
import CollaboratorCard from '../components/CollaboratorCard';
import CollaboratorEvaluation360 from '../components/EvaluationCards/Evaluation360';
import RatingDisplay from '../components/RatingDisplay';
import MentoringCard from '../components/EvaluationCards/MentoringCard';
import CardContainer from '../components/CardContainer';
import AnimatedCard from '../components/AnimatedCard';
import ReferenceCard from '../components/EvaluationCards/ReferenceCard';
import NotificationBadge from '../components/NotificationBadge';
import { useNotifications } from '../hooks/useNotifications';
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

    const [searchQuery360, setSearchQuery360] = useState('');
    const [searchQueryReference, setSearchQueryReference] = useState('');

    const [selectedCollaborators360, setSelectedCollaborators360] = useState<
        Collaborator[]
    >([]);
    const [collaboratorEvaluations360, setCollaboratorEvaluations360] =
        useState<Record<string, CollaboratorEvaluation>>({});

    const [selectedCollaboratorsReference, setSelectedCollaboratorsReference] =
        useState<Collaborator[]>([]);
    const [
        collaboratorEvaluationsReference,
        setCollaboratorEvaluationsReference,
    ] = useState<Record<string, CollaboratorEvaluation>>({});

    const [mentoringRating, setMentoringRating] = useState<number | null>(null);
    const [mentoringJustification, setMentoringJustification] = useState('');
    const {
        updateNotificationCount,
        updateNotificationState,
        getNotification,
    } = useNotifications([
        { id: 'autoavaliacao', active: false },
        { id: 'avaliacao360', active: false },
        { id: 'mentoring', active: false },
        { id: 'referencias', active: false },
    ]);

    const isFormComplete = false;
    const sectionNotificationMap: Record<string, string> = {
        Autoavaliação: 'autoavaliacao',
        'Avaliação 360': 'avaliacao360',
        Mentoring: 'mentoring',
        Referências: 'referencias',
    };

    const handleNavClick = useCallback((section: string) => {
        setActiveSection(section);
    }, []);

    const addCollaboratorTo360 = useCallback((collaborator: Collaborator) => {
        setSelectedCollaborators360(prev => [...prev, collaborator]);
        setCollaboratorEvaluations360(prev => ({
            ...prev,
            [collaborator.id]: {
                collaboratorId: collaborator.id,
                ratings: {},
                pontosFortes: '',
                pontosMelhoria: '',
                referencia: '',
            },
        }));
    }, []);

    const removeCollaboratorFrom360 = useCallback((collaboratorId: string) => {
        setSelectedCollaborators360(prev =>
            prev.filter(c => c.id !== collaboratorId),
        );
        setCollaboratorEvaluations360(prev => {
            const newEvaluations = { ...prev };
            delete newEvaluations[collaboratorId];
            return newEvaluations;
        });
    }, []);

    const updateCollaboratorRating360 = useCallback(
        (collaboratorId: string, rating: number | null) => {
            setCollaboratorEvaluations360(prev => ({
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

    const updateCollaboratorField360 = useCallback(
        (
            collaboratorId: string,
            field: 'pontosFortes' | 'pontosMelhoria' | 'referencia',
            value: string,
        ) => {
            setCollaboratorEvaluations360(prev => ({
                ...prev,
                [collaboratorId]: {
                    ...prev[collaboratorId],
                    [field]: value,
                },
            }));
        },
        [],
    );

    const addCollaboratorToReference = useCallback(
        (collaborator: Collaborator) => {
            setSelectedCollaboratorsReference(prev => [...prev, collaborator]);
            setCollaboratorEvaluationsReference(prev => ({
                ...prev,
                [collaborator.id]: {
                    collaboratorId: collaborator.id,
                    ratings: {},
                    pontosFortes: '',
                    pontosMelhoria: '',
                    referencia: '',
                },
            }));
        },
        [],
    );

    const removeCollaboratorFromReference = useCallback(
        (collaboratorId: string) => {
            setSelectedCollaboratorsReference(prev =>
                prev.filter(c => c.id !== collaboratorId),
            );
            setCollaboratorEvaluationsReference(prev => {
                const newEvaluations = { ...prev };
                delete newEvaluations[collaboratorId];
                return newEvaluations;
            });
        },
        [],
    );

    const updateCollaboratorFieldReference = useCallback(
        (
            collaboratorId: string,
            field: 'pontosFortes' | 'pontosMelhoria' | 'referencia',
            value: string,
        ) => {
            setCollaboratorEvaluationsReference(prev => ({
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

    useEffect(() => {
        const incompleteCriteriaCount = Object.values(
            mockEvaluationPillars,
        ).reduce((total, pillar) => {
            const incompleteInPillar = pillar.criterios.filter(
                (criterion: Criterion) => {
                    const evaluation = evaluations[criterion.id];
                    return !(
                        evaluation?.rating &&
                        evaluation?.justification &&
                        evaluation.justification.trim() !== ''
                    );
                },
            ).length;
            return total + incompleteInPillar;
        }, 0);

        updateNotificationCount('autoavaliacao', incompleteCriteriaCount);

        if (selectedCollaborators360.length === 0) {
            updateNotificationState('avaliacao360', {
                active: true,
                count: undefined,
            });
        } else {
            const incompleteCollaborator360Evaluations =
                selectedCollaborators360.filter(collaborator => {
                    const evaluation =
                        collaboratorEvaluations360[collaborator.id];
                    return !(
                        evaluation?.ratings?.general &&
                        evaluation?.pontosFortes?.trim() &&
                        evaluation?.pontosMelhoria?.trim()
                    );
                }).length;

            if (incompleteCollaborator360Evaluations === 0) {
                updateNotificationCount('avaliacao360', 0);
            } else {
                updateNotificationCount(
                    'avaliacao360',
                    incompleteCollaborator360Evaluations,
                );
            }
        }

        const incompleteReferenceEvaluations =
            selectedCollaboratorsReference.filter(collaborator => {
                const evaluation =
                    collaboratorEvaluationsReference[collaborator.id];
                return !evaluation?.referencia?.trim();
            }).length;

        updateNotificationCount('referencias', incompleteReferenceEvaluations);

        const isMentoringIncomplete = !(
            mentoringRating && mentoringJustification.trim()
        );
        updateNotificationCount('mentoring', isMentoringIncomplete ? 1 : 0);
    }, [
        evaluations,
        selectedCollaborators360,
        collaboratorEvaluations360,
        selectedCollaboratorsReference,
        collaboratorEvaluationsReference,
        mentoringRating,
        mentoringJustification,
        updateNotificationCount,
        updateNotificationState,
    ]);

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
                    {sections.map(section => {
                        const notificationId = sectionNotificationMap[section];
                        const notification = getNotification(notificationId);

                        return (
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
                                <NotificationBadge
                                    show={notification?.active || false}
                                    count={notification?.count}
                                    variant="medium"
                                    position="top-right"
                                />
                            </div>
                        );
                    })}
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
                                                            <NotificationBadge
                                                                show={true}
                                                                count={
                                                                    stats.totalCount -
                                                                    stats.completedCount
                                                                }
                                                                variant="small"
                                                                position="top-right"
                                                                className="relative top-0 right-0"
                                                            />
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
                                    value={searchQuery360}
                                    onChange={setSearchQuery360}
                                    placeholder="Buscar por colaboradores"
                                    className="w-full"
                                    searchFunction={searchCollaborators}
                                    onItemSelect={addCollaboratorTo360}
                                    renderItem={collaborator => (
                                        <CollaboratorCard
                                            collaborator={collaborator}
                                            variant="compact"
                                        />
                                    )}
                                    excludeItems={selectedCollaborators360}
                                    getItemKey={collaborator => collaborator.id}
                                    noResultsMessage="Nenhum colaborador encontrado"
                                />
                            </div>
                        </div>

                        {selectedCollaborators360.length > 0 ? (
                            <div className="space-y-6">
                                <AnimatePresence>
                                    {selectedCollaborators360.map(
                                        (collaborator, index) => {
                                            const evaluation =
                                                collaboratorEvaluations360[
                                                    collaborator.id
                                                ];
                                            return (
                                                <AnimatedCard
                                                    key={collaborator.id}
                                                    index={index}
                                                >
                                                    <CollaboratorEvaluation360
                                                        collaborator={
                                                            collaborator
                                                        }
                                                        evaluation={evaluation}
                                                        onClearEvaluation={
                                                            removeCollaboratorFrom360
                                                        }
                                                        onRatingChange={
                                                            updateCollaboratorRating360
                                                        }
                                                        onFieldChange={
                                                            updateCollaboratorField360
                                                        }
                                                    />
                                                </AnimatedCard>
                                            );
                                        },
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <motion.div
                                className="text-center py-12"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Typography
                                    variant="body"
                                    className="text-gray-500"
                                >
                                    Busque um colaborador para começar a
                                    Avaliação 360
                                </Typography>
                            </motion.div>
                        )}
                    </section>
                )}
                {activeSection === 'Mentoring' && (
                    <section>
                        <MentoringCard
                            rating={mentoringRating}
                            justification={mentoringJustification}
                            onRatingChange={setMentoringRating}
                            onJustificationChange={setMentoringJustification}
                        />
                    </section>
                )}
                {activeSection === 'Referências' && (
                    <section>
                        <div className="mb-8">
                            <div className="mb-6 relative">
                                <SearchBar<Collaborator>
                                    value={searchQueryReference}
                                    onChange={setSearchQueryReference}
                                    placeholder="Buscar por colaboradores"
                                    className="w-full"
                                    searchFunction={searchCollaborators}
                                    onItemSelect={addCollaboratorToReference}
                                    renderItem={collaborator => (
                                        <CollaboratorCard
                                            collaborator={collaborator}
                                            variant="compact"
                                        />
                                    )}
                                    excludeItems={
                                        selectedCollaboratorsReference
                                    }
                                    getItemKey={collaborator => collaborator.id}
                                    noResultsMessage="Nenhum colaborador encontrado"
                                />
                            </div>
                        </div>

                        {selectedCollaboratorsReference.length > 0 ? (
                            <div className="space-y-6">
                                <AnimatePresence>
                                    {selectedCollaboratorsReference.map(
                                        (collaborator, index) => {
                                            const evaluation =
                                                collaboratorEvaluationsReference[
                                                    collaborator.id
                                                ];
                                            return (
                                                <AnimatedCard
                                                    key={collaborator.id}
                                                    index={index}
                                                >
                                                    <ReferenceCard
                                                        collaborator={
                                                            collaborator
                                                        }
                                                        evaluation={evaluation}
                                                        onClearReference={
                                                            removeCollaboratorFromReference
                                                        }
                                                        onFieldChange={
                                                            updateCollaboratorFieldReference
                                                        }
                                                    />
                                                </AnimatedCard>
                                            );
                                        },
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <motion.div
                                className="text-center py-12"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Typography
                                    variant="body"
                                    className="text-gray-500"
                                >
                                    Indique colaboradores como referências
                                </Typography>
                            </motion.div>
                        )}
                    </section>
                )}
            </main>
        </>
    );
}
