import { useEffect, useMemo, memo, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ChevronDown } from 'lucide-react';
import CardContainer from '../../CardContainer';
import Typography from '../../Typography';
import NotificationBadge from '../../NotificationBadge';
import RatingDisplay from '../../RatingDisplay';
import SelfAssessment from '../Cards/SelfAssessment';
import {
    mockEvaluationPillars,
    type Criterion,
} from '../../../data/mockEvaluationPIllars';
import type { EvaluationFormData } from '../../../schemas/evaluation';

export const SelfAssessmentSection = memo(() => {
    const { control, watch } = useFormContext<EvaluationFormData>();
    const [minimizedPillars, setMinimizedPillars] = useState<
        Record<string, boolean>
    >({});

    const { fields, append } = useFieldArray({
        control,
        name: 'selfAssessment',
    });

    useEffect(() => {
        if (fields.length === 0) {
            const allCriteria = Object.values(mockEvaluationPillars).flatMap(
                pillar =>
                    pillar.criterios.map((criterion: Criterion) => ({
                        criterionId: criterion.id,
                        rating: null,
                        justification: '',
                    })),
            );

            allCriteria.forEach(criterion => append(criterion));
        }
    }, [fields.length, append]);

    const validFields = useMemo(
        () => fields.filter(field => field.criterionId),
        [fields],
    );

    const selfAssessmentValues = useMemo(
        () => watch('selfAssessment') || [],
        [watch],
    );

    const togglePillar = (pillarTitle: string) => {
        setMinimizedPillars(prev => ({
            ...prev,
            [pillarTitle]: !prev[pillarTitle],
        }));
    };

    const pillarStats = useMemo(() => {
        return Object.values(mockEvaluationPillars).map(pillar => {
            const pillarCriteria = pillar.criterios;
            const completedCount = pillarCriteria.filter(
                (criterion: Criterion) => {
                    const fieldIndex = validFields.findIndex(
                        f => f.criterionId === criterion.id,
                    );
                    if (fieldIndex === -1) return false;

                    const evaluation = selfAssessmentValues[fieldIndex];
                    return (
                        evaluation?.rating && evaluation?.justification?.trim()
                    );
                },
            ).length;

            const ratings = pillarCriteria
                .map((criterion: Criterion) => {
                    const fieldIndex = validFields.findIndex(
                        f => f.criterionId === criterion.id,
                    );
                    return fieldIndex !== -1
                        ? selfAssessmentValues[fieldIndex]?.rating
                        : null;
                })
                .filter(
                    (rating: number | null | undefined): rating is number =>
                        rating !== null && rating !== undefined,
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

            return {
                pillarTitle: pillar.titulo,
                completedCount,
                totalCount: pillar.criterios.length,
                average,
                criteria: pillar.criterios,
            };
        });
    }, [validFields, selfAssessmentValues]);

    return (
        <section>
            <div className="space-y-8">
                {pillarStats.map(pillarStat => {
                    const isMinimized =
                        minimizedPillars[pillarStat.pillarTitle];
                    const pendingCount =
                        pillarStat.totalCount - pillarStat.completedCount;

                    return (
                        <CardContainer
                            className="pt-14 p-10 mb-5"
                            key={pillarStat.pillarTitle}
                        >
                            <div
                                className="flex items-center justify-between mb-4 cursor-pointer"
                                onClick={() =>
                                    togglePillar(pillarStat.pillarTitle)
                                }
                            >
                                <div className="flex items-center gap-2">
                                    <Typography
                                        variant="h3"
                                        color="primary500"
                                        className="text-xl font-bold"
                                    >
                                        Critérios de {pillarStat.pillarTitle}
                                    </Typography>
                                    {pendingCount > 0 && (
                                        <NotificationBadge
                                            show={true}
                                            count={pendingCount}
                                            variant="small"
                                            position="top-right"
                                            className="relative top-0 right-0"
                                        />
                                    )}
                                </div>
                                <div className="flex items-center gap-4">
                                    <RatingDisplay
                                        rating={pillarStat.average || null}
                                    />
                                    <Typography
                                        variant="body"
                                        className="text-sm text-gray-500"
                                    >
                                        {pillarStat.completedCount}/
                                        {pillarStat.totalCount} preenchidos
                                    </Typography>
                                    <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ease-out ${
                                            isMinimized
                                                ? 'rotate-180'
                                                : 'rotate-0'
                                        }`}
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
                                    {pillarStat.criteria.map(
                                        (
                                            criterion: Criterion,
                                            index: number,
                                        ) => {
                                            const fieldIndex =
                                                validFields.findIndex(
                                                    f =>
                                                        f.criterionId ===
                                                        criterion.id,
                                                );
                                            if (fieldIndex === -1) return null;

                                            const fieldName = `selfAssessment.${fieldIndex}`;
                                            const isLast =
                                                index ===
                                                pillarStat.criteria.length - 1;

                                            return (
                                                <SelfAssessment
                                                    key={criterion.id}
                                                    criterionName={
                                                        criterion.nome
                                                    }
                                                    name={fieldName}
                                                    topicNumber={index + 1}
                                                    isLast={isLast}
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
});
