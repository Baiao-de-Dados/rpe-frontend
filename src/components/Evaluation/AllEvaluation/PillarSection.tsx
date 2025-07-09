import { useQueryState } from 'nuqs';
import { memo } from 'react';

import CollapsibleCardSection from '../../common/CollapsibleCardSection';
import SelfAssessment from './Cards/SelfAssessment';
import { PillarRatingDisplay } from './PillarRatingDisplay';
import type { PillarCriteria } from '../../../data/mockEvaluations';

interface PillarSectionProps {
    pillarName: string;
    criteria: PillarCriteria[];
}

export const PillarSection = memo(({ pillarName, criteria }: PillarSectionProps) => {

    const [pillarOpenList, setPillarOpenList] = useQueryState('pillar_open', {
        defaultValue: '',
        history: 'replace',
    });
    const pillarId = pillarName;
    const openArray = pillarOpenList ? pillarOpenList.split(',') : [];
    const isOpen = openArray.includes(pillarId);

    const toggleMinimized = () => {
        let newArray: string[];
        if (isOpen) {
            newArray = openArray.filter(id => id !== pillarId);
        } else {
            newArray = [...openArray, pillarId];
        }
        setPillarOpenList(newArray.join(','));
    };

    return (
        <CollapsibleCardSection
            title={`Critérios de ${pillarName}`}
            defaultOpen={isOpen}
            onHeaderClick={toggleMinimized}
            isOpen={isOpen}
            className="pt-14 p-10 mb-5"
            headerRight={
                <div className="flex items-center gap-3 whitespace-nowrap">
                    <div className="flex flex-col items-center">
                        <PillarRatingDisplay criteria={criteria} />
                    </div>
                    <div className="flex flex-col items-center">
                        <PillarRatingDisplay criteria={criteria} ratingKey="managerRating" />
                    </div>
                </div>
            }
        >
            <div className="space-y-4">
                {criteria.map((criterion, idx) => (
                    <SelfAssessment
                        key={criterion.criteriaName}
                        criterionName={criterion.criteriaName}
                        rating={criterion.rating}
                        mentorRating={criterion.managerRating}
                        justification={criterion.justification}
                        isLast={idx === criteria.length - 1}
                    />
                ))}
            </div>
        </CollapsibleCardSection>
    );
});
