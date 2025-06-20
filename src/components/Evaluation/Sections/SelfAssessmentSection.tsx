import { useState } from 'react';
import Typography from '../../Typography';
import CardContainer from '../../CardContainer';
import NotificationBadge from '../../NotificationBadge';
import RatingDisplay from '../../RatingDisplay';
import SelfAssessment from '../Cards/SelfAssessment';
import { ChevronDown } from 'lucide-react';
import {
    mockEvaluationPillars,
    type Criterion,
} from '../../../data/mockEvaluationPIllars';

interface CriterionEvaluation {
    rating?: number;
    justification?: string;
}

interface SelfAssessmentSectionProps {
    evaluations: Record<string, CriterionEvaluation>;
    updateEvaluation: (
        criterionId: string,
        evaluation: CriterionEvaluation,
    ) => void;
}

export function SelfAssessmentSection({
    evaluations,
    updateEvaluation,
}: SelfAssessmentSectionProps) {
    const [minimizedPillars, setMinimizedPillars] = useState<
        Record<string, boolean>
    >(() => {
        const initialState: Record<string, boolean> = {};
        Object.values(mockEvaluationPillars).forEach(pillar => {
            initialState[pillar.titulo] = true;
        });
        return initialState;
    });

    const togglePillar = (pillarTitle: string) => {
        setMinimizedPillars(prev => ({
            ...prev,
            [pillarTitle]: !prev[pillarTitle],
        }));
    };

    const completedCriteriaCount = Object.values(mockEvaluationPillars).map(
        pillar => {
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
        },
    );

    const pillarAverages = Object.values(mockEvaluationPillars).reduce(
        (acc, pillar) => {
            const ratings = pillar.criterios
                .map(
                    (criterion: Criterion) => evaluations[criterion.id]?.rating,
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

    const pillarStats = completedCriteriaCount.reduce(
        (acc, item) => {
            acc[item.pillarTitle] = item;
            return acc;
        },
        {} as Record<string, (typeof completedCriteriaCount)[0]>,
    );

    return (
        <section>
            <div className="space-y-8">
                {Object.entries(mockEvaluationPillars).map(([, pillar]) => {
                    const stats = pillarStats[pillar.titulo];
                    const isMinimized = minimizedPillars[pillar.titulo];

                    return (
                        <CardContainer
                            className="pt-14 p-10 mb-5"
                            key={pillar.titulo}
                        >
                            <div
                                className="flex items-center justify-between mb-4 cursor-pointer"
                                onClick={() => togglePillar(pillar.titulo)}
                            >
                                <div className="flex items-center gap-2">
                                    <Typography
                                        variant="h3"
                                        color="primary500"
                                        className="text-xl font-bold"
                                    >
                                        Critérios de {pillar.titulo}
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
                                    />
                                    <Typography
                                        variant="body"
                                        className="text-sm text-gray-500"
                                    >
                                        {stats?.completedCount || 0} de{' '}
                                        {pillar.criterios.length} critérios
                                        concluídos
                                    </Typography>
                                    <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ease-out ${isMinimized ? 'rotate-180' : 'rotate-0'}`}
                                    >
                                        <ChevronDown
                                            size={24}
                                            className="text-gray-600"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`transition-all duration-300 ease-out overflow-hidden ${
                                    isMinimized
                                        ? 'max-h-0 opacity-0'
                                        : 'max-h-[2000px] opacity-100'
                                }`}
                            >
                                <div className="space-y-4">
                                    {pillar.criterios.map(
                                        (
                                            criterion: Criterion,
                                            index: number,
                                        ) => {
                                            const evaluation =
                                                evaluations[criterion.id] || {};
                                            return (
                                                <SelfAssessment
                                                    key={criterion.id}
                                                    topicNumber={index + 1}
                                                    topicName={criterion.nome}
                                                    isLast={
                                                        index ===
                                                        pillar.criterios
                                                            .length -
                                                            1
                                                    }
                                                    rating={evaluation.rating}
                                                    justification={
                                                        evaluation.justification ||
                                                        ''
                                                    }
                                                    onEvaluationChange={(
                                                        rating,
                                                        justification,
                                                    ) =>
                                                        updateEvaluation(
                                                            criterion.id,
                                                            {
                                                                rating:
                                                                    rating ||
                                                                    undefined,
                                                                justification,
                                                            },
                                                        )
                                                    }
                                                />
                                            );
                                        },
                                    )}
                                </div>
                            </div>
                        </CardContainer>
                    );
                })}
            </div>
        </section>
    );
}
