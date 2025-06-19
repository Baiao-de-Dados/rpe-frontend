import Typography from '../../Typography';
import CardContainer from '../../CardContainer';
import NotificationBadge from '../../NotificationBadge';
import RatingDisplay from '../../RatingDisplay';
import SelfAssessment from '../Cards/SelfAssessment';
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
    // Cálculos simples - removido useMemo desnecessário
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
                    return (
                        <CardContainer
                            className="pt-14 p-10 mb-5"
                            key={pillar.titulo}
                        >
                            <div className="flex items-center justify-between mb-4">
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
                                </div>
                            </div>
                            <div className="space-y-4">
                                {pillar.criterios.map(
                                    (criterion: Criterion, index: number) => {
                                        const evaluation =
                                            evaluations[criterion.id] || {};
                                        return (
                                            <SelfAssessment
                                                key={criterion.id}
                                                topicNumber={index + 1}
                                                topicName={criterion.nome}
                                                isLast={
                                                    index ===
                                                    pillar.criterios.length - 1
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
                        </CardContainer>
                    );
                })}
            </div>
        </section>
    );
}
