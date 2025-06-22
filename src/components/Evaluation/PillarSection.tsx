import { memo, useMemo, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';
import CardContainer from '../CardContainer';
import Typography from '../Typography';
import SelfAssessment from './Cards/SelfAssessment';
import { PillarRatingDisplay } from './PillarRatingDisplay';
import NotificationBadge from '../NotificationBadge';
import { useQueryState } from 'nuqs';
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

export const PillarSection = memo(
    ({ pillarTitle, criteria, validFields }: PillarSectionProps) => {
        const [pillarOpenList, setPillarOpenList] = useQueryState(
            'pillar_open',
            {
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
                const hasJustification =
                    typeof justification === 'string' &&
                    justification.trim().length > 0;

                if (!hasRating || !hasJustification) {
                    incompleteCount++;
                }
            }

            return incompleteCount;
        }, [watchedData, fieldIndices.length, criteria.length]);

        const completedCriteriaCount =
            criteria.length - incompleteCriteriaCount;

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
            <CardContainer className="pt-14 p-10 mb-5 relative">
                <div
                    className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 cursor-pointer gap-2 md:gap-0"
                    onClick={toggleMinimized}
                >
                    <div className="flex flex-col min-w-0 relative w-full md:w-auto">
                        <div className="flex items-center gap-2 min-w-0 w-full">
                            <Typography
                                variant="h3"
                                color="primary500"
                                className="text-base md:text-xl font-bold break-words whitespace-normal w-full"
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
                        {/* Ícones e status lado a lado, abaixo do título no mobile */}
                        <div className="flex flex-row items-center gap-2 mt-2 md:mt-0 md:hidden">
                            <div className="min-w-[40px] ml-2 md:ml-0">
                                <PillarRatingDisplay
                                    criteria={criteria}
                                    validFields={validFields}
                                />
                            </div>
                            <span className="text-sm text-gray-500 min-w-[90px] ml-2 md:ml-0">
                                {completedCriteriaCount}/{criteria.length}{' '}
                                preenchidos
                            </span>
                            <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ease-out ml-2 md:ml-0 ${
                                    isOpen ? 'rotate-180' : 'rotate-0'
                                }`}
                            >
                                <ChevronDown
                                    size={24}
                                    className="text-gray-600"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Ícones e status lado a lado, ao lado do título no desktop/tablet */}
                    <div className="hidden md:flex items-center gap-4 flex-nowrap flex-row overflow-x-auto w-full md:w-auto mt-2 md:mt-0">
                        <div className="min-w-[40px] ml-2 md:ml-0">
                            <PillarRatingDisplay
                                criteria={criteria}
                                validFields={validFields}
                            />
                        </div>
                        <span className="text-sm text-gray-500 min-w-[90px] ml-2 md:ml-0">
                            {completedCriteriaCount}/{criteria.length}{' '}
                            preenchidos
                        </span>
                        <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ease-out ${
                                isOpen ? 'rotate-0' : 'rotate-180'
                            }`}
                        >
                            <ChevronDown size={24} className="text-gray-600" />
                        </div>
                    </div>
                </div>

                <div
                    className={`transition-all duration-300 ease-out overflow-hidden ${
                        isOpen
                            ? 'max-h-[2000px] opacity-100'
                            : 'max-h-0 opacity-0'
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
