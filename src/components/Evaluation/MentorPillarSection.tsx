import { memo, useMemo, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useQueryState } from 'nuqs';

import CollapsibleCardSection from '../common/CollapsibleCardSection';
import NotificationBadge from '../common/NotificationBadge';
import Typography from '../common/Typography';
import MentorAssessment from './CardsMentor/MentorAssessment';
import MentorPillarRatingDisplay from './MentorPillarRatingDisplay';

import type { Criterion } from '../../data/mockEvaluationPIllars';
import type { FullMentorEvaluationFormData } from '../../schemas/mentorEvaluation';

interface MentorPillarSectionProps {
    pillarTitle: string;
    criteria: Criterion[];
    validFields: Array<{
        id: string;
        pilarId: string;
        criterionId: string;
        index: number;
    }>;
    // Dados do colaborador (read-only)
    collaboratorData?: Array<{
        criterionId: string;
        rating?: number | null;
        justification?: string;
    }>;
}

export const MentorPillarSection = memo(({ 
    pillarTitle, 
    criteria, 
    validFields,
    collaboratorData = []
}: MentorPillarSectionProps) => {

    const [pillarOpenList, setPillarOpenList] = useQueryState('mentor_pillar_open', {
        defaultValue: '',
        history: 'replace',
    });

    const pillarId = pillarTitle;
    const openArray = pillarOpenList ? pillarOpenList.split(',') : [];
    const isOpen = openArray.includes(pillarId);

    const { control } = useFormContext<FullMentorEvaluationFormData>();

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
            `mentorAssessment.${index}.rating` as const,
            `mentorAssessment.${index}.justification` as const,
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

    // Função para buscar os dados do colaborador para um critério específico
    const getCollaboratorDataForCriterion = (criterionId: string) => {
        return collaboratorData.find(data => data.criterionId === criterionId);
    };

    return (
        <CollapsibleCardSection
            title={`Avaliação de ${pillarTitle}`}
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
                    <MentorPillarRatingDisplay 
                        criteria={criteria} 
                        validFields={validFields}
                        collaboratorData={collaboratorData}
                    />
                    <div className="flex items-center bg-primary-50 px-2 py-1 rounded-lg">
                        <Typography variant="caption" color="muted" className="text-xs">
                            {criteria.length - incompleteCriteriaCount}/{criteria.length} avaliados
                        </Typography>
                    </div>
                </div>
            }
            defaultOpen={isOpen}
            onHeaderClick={toggleMinimized}
            className="pt-14 p-10 mb-5"
        >
            <div className="space-y-4">
                {criteria.map((criterion, index) => {
                    const fieldIndex = validFields.findIndex(f => f.criterionId === criterion.id);
                    if (fieldIndex === -1) return null;

                    const collaboratorCriterionData = getCollaboratorDataForCriterion(criterion.id);

                    return (
                        <MentorAssessment
                            key={criterion.id}
                            criterionName={criterion.nome}
                            name={`mentorAssessment.${fieldIndex}`}
                            topicNumber={index + 1}
                            isLast={index === criteria.length - 1}
                            collaboratorRating={collaboratorCriterionData?.rating}
                            collaboratorJustification={collaboratorCriterionData?.justification}
                        />
                    );
                })}
            </div>
        </CollapsibleCardSection>
    );
});
