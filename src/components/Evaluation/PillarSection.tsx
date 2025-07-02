import { useQueryState } from 'nuqs';
import { memo, useMemo, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import SelfAssessment from './Cards/SelfAssessment';
import { PillarRatingDisplay } from './PillarRatingDisplay';

import NotificationBadge from '../common/NotificationBadge';
import CollapsibleCardSection from '../common/CollapsibleCardSection';

import type { Criterion } from '../../data/mockEvaluationPIllars';

import type { EvaluationFormData } from '../../schemas/evaluation';

interface PillarSectionProps {
    pillarTitle: string;
    criteria: Criterion[];
    validFields: Array<{
        id: string;
        pilarId: string;
        criterionId: string;
        index: number;
    }>;
}

export const PillarSection = memo(({ pillarTitle, criteria, validFields }: PillarSectionProps) => {

        const [pillarOpenList, setPillarOpenList] = useQueryState('pillar_open', {
                defaultValue: '',
                history: 'replace',
            },
        );

        const pillarId = pillarTitle;
        const openArray = pillarOpenList ? pillarOpenList.split(',') : [];
        const isOpen = openArray.includes(pillarId);

        const { control } = useFormContext<EvaluationFormData>();

        const fieldIndices = useMemo(() => {
            return criteria
                .map(criterion =>
                    validFields.findIndex(f => f.criterionId === criterion.id),
                )
                .filter(index => index !== -1);
        }, [criteria, validFields]);

        const watchedData = useWatch({
            control,
            name: fieldIndices.flatMap(index => [
                `selfAssessment.${index}.rating` as const,
                `selfAssessment.${index}.justification` as const,
            ]),
        });

        const incompleteCriteriaCount = useMemo(() => {
            if (!watchedData || fieldIndices.length === 0)
                return criteria.length;

            let incompleteCount = 0;

            for (let i = 0; i < fieldIndices.length; i++) {
                const ratingIndex = i * 2;
                const justificationIndex = i * 2 + 1;

                const rating = watchedData[ratingIndex];
                const justification = watchedData[justificationIndex];

                const hasRating = typeof rating === 'number' && rating > 0;
                const hasJustification = typeof justification === 'string' && justification.trim().length > 0;

                if (!hasRating || !hasJustification) {
                    incompleteCount++;
                }
            }

            return incompleteCount;
        }, [watchedData, fieldIndices.length, criteria.length]);

        const completedCriteriaCount = criteria.length - incompleteCriteriaCount;

        const toggleMinimized = () => {
            let newArray: string[];
            if (isOpen) {
                newArray = openArray.filter(id => id !== pillarId);
            } else {
                newArray = [...openArray, pillarId];
            }
            setPillarOpenList(newArray.join(','));
        };

        useEffect(() => {}, [pillarOpenList]);

        return (
            <CollapsibleCardSection
                title={`Critérios de ${pillarTitle}`}
                notificationBadge={
                    <NotificationBadge
                        show={incompleteCriteriaCount > 0}
                        count={incompleteCriteriaCount}
                        position="center-right"
                        variant="medium"
                        absolute={false}
                    />
                }
                headerRight={
                    <>
                        <PillarRatingDisplay criteria={criteria} validFields={validFields} />
                        <span className="text-sm text-gray-500">
                            {completedCriteriaCount}/{criteria.length}{' '}
                            preenchidos
                        </span>
                    </>
                }
                defaultOpen={isOpen}
                onHeaderClick={toggleMinimized}
                className="pt-14 p-10 mb-5"
            >
                <div className="space-y-4">
                    {criteria.map((criterion: Criterion, index: number) => {
                        const fieldData = validFields.find(f => f.criterionId === criterion.id);
                        if (!fieldData) return null;

                        const fieldName = `selfAssessment.${fieldData.index}`;
                        const isLast = index === criteria.length - 1;

                        return (
                            <SelfAssessment
                                key={criterion.id}
                                criterionName={criterion.nome}
                                name={fieldName}
                                topicNumber={index + 1}
                                isLast={isLast}
                            />
                        );
                    })}
                </div>
            </CollapsibleCardSection>
        );
    },
);
