import { useQueryState } from 'nuqs';
import { memo, useMemo, useEffect } from 'react';

import SelfAssessment from './Cards/SelfAssessment';
import { PillarRatingDisplay } from './PillarRatingDisplay';

import type { Criterion } from '../../data/mockEvaluationPIllars';

import NotificationBadge from '../common/NotificationBadge';
import CollapsibleCardSection from '../common/CollapsibleCardSection';

import { useEvaluationCompletion } from '../../hooks/useEvaluationCompletion';

interface PillarSectionProps {
    pillarTitle: string;
    criteria: Criterion[];
    validFields: Array<{
        id: number;
        pilarId: number;
        criterionId: number;
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
        const openArray = useMemo(() => 
            pillarOpenList ? pillarOpenList.split(',') : [], 
            [pillarOpenList]
        );

        const { getIncompleteCriteriaCountForPillar, getHasPendingIAForPillar } = useEvaluationCompletion();

        const incompleteCriteriaCount = getIncompleteCriteriaCountForPillar(criteria, validFields);
        const hasPendingIA = getHasPendingIAForPillar(criteria, validFields);

        const completedCriteriaCount = criteria.length - incompleteCriteriaCount;

        const toggleMinimized = () => {

            if (hasPendingIA && isOpen) {
                return;
            }
            
            let newArray: string[];
            if (isOpen) {
                newArray = openArray.filter(id => id !== pillarId);
            } else {
                newArray = [...openArray, pillarId];
            }
            setPillarOpenList(newArray.join(','));
        };

        const isOpen = openArray.includes(pillarId) || hasPendingIA;

        useEffect(() => {
            if (hasPendingIA && !openArray.includes(pillarId)) {
                const newArray = [...openArray, pillarId];
                setPillarOpenList(newArray.join(','));
            }
        }, [hasPendingIA, pillarId, openArray, setPillarOpenList]);

        return (
            <CollapsibleCardSection title={`Critérios de ${pillarTitle}`} className="pt-14 p-10 mb-5"
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
                    <div className="flex items-center gap-2 whitespace-nowrap">
                        <PillarRatingDisplay criteria={criteria} validFields={validFields} />
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                            {completedCriteriaCount}/{criteria.length} preenchidos
                        </span>
                    </div>
                }
                isOpen={isOpen}
                onHeaderClick={toggleMinimized}
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
