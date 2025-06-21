import { memo, useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';
import CardContainer from '../CardContainer';
import Typography from '../Typography';
import SelfAssessment from './Cards/SelfAssessment';
import { PillarRatingDisplay } from './PillarRatingDisplay';
import NotificationBadge from '../NotificationBadge';
import type { Criterion } from '../../data/mockEvaluationPIllars';
import type { EvaluationFormData } from '../../schemas/evaluation';

interface PillarSectionProps {
    pillarTitle: string;
    criteria: Criterion[];
    validFields: Array<{ id: string; criterionId: string; index: number }>;
}

export const PillarSection = memo(
    ({ pillarTitle, criteria, validFields }: PillarSectionProps) => {
        const [isMinimized, setIsMinimized] = useState(true);
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
                const hasJustification =
                    typeof justification === 'string' &&
                    justification.trim().length > 0;

                if (!hasRating || !hasJustification) {
                    incompleteCount++;
                }
            }

            return incompleteCount;
        }, [watchedData, fieldIndices.length, criteria.length]);

        const toggleMinimized = () => {
            setIsMinimized(!isMinimized);
        };

        return (
            <CardContainer className="pt-14 p-10 mb-5 relative">
                <div
                    className="flex items-center justify-between mb-4 cursor-pointer"
                    onClick={toggleMinimized}
                >
                    <div className="flex items-center gap-2 relative">
                        <Typography
                            variant="h3"
                            color="primary500"
                            className="text-xl font-bold"
                        >
                            Critérios de {pillarTitle}
                        </Typography>
                        <NotificationBadge
                            show={incompleteCriteriaCount > 0}
                            count={incompleteCriteriaCount}
                            position="center-right"
                            variant="medium"
                            className="-right-6.5"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <PillarRatingDisplay
                            criteria={criteria}
                            validFields={validFields}
                        />
                        <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ease-out ${
                                isMinimized ? 'rotate-180' : 'rotate-0'
                            }`}
                        >
                            <ChevronDown size={24} className="text-gray-600" />
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
                        {criteria.map((criterion: Criterion, index: number) => {
                            const fieldData = validFields.find(
                                f => f.criterionId === criterion.id,
                            );
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
                </div>
            </CardContainer>
        );
    },
);
