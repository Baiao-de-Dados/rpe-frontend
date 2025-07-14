import { memo, useMemo, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useQueryState } from 'nuqs';

import CollapsibleCardSection from '../common/CollapsibleCardSection';
import NotificationBadge from '../common/NotificationBadge';
import Typography from '../common/Typography';
import ManagerAssessment from './CardsManager/ManagerAssessment';
import ManagerPillarRatingDisplay from './ManagerPillarDisplay';

import type { Criterion } from '../../data/mockEvaluationPIllars';

// Tipo para critérios com peso
interface CriterionWithWeight extends Criterion {
    weight?: number;
}
import type { FullManagerEvaluationFormData } from '../../schemas/managerEvaluation';

interface ManagerPillarSectionProps {
    pillarTitle: string;
    criteria: CriterionWithWeight[];
    validFields: Array<{
        id: number;
        pilarId: number;
        criterionId: number;
        index: number;
    }>;
    // Dados do colaborador (read-only)
    collaboratorData?: Array<{
        criterionId: number;
        rating?: number | null;
        justification?: string;
    }>;
    // Modo somente leitura
    isReadOnly?: boolean;
}

export const ManagerPillarSection = memo(({ 
    pillarTitle, 
    criteria, 
    validFields,
    collaboratorData = [],
    isReadOnly = false,
}: ManagerPillarSectionProps) => {

    const [pillarOpenList, setPillarOpenList] = useQueryState('manager_pillar_open', {
        defaultValue: '',
        history: 'replace',
    });

    const pillarId = pillarTitle;
    const openArray = pillarOpenList ? pillarOpenList.split(',') : [];
    const isOpen = openArray.includes(pillarId);

    const { control } = useFormContext<FullManagerEvaluationFormData>();

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
            `managerAssessment.${index}.rating` as const,
            `managerAssessment.${index}.justification` as const,
        ]),
    });

    const incompleteCriteriaCount = useMemo(() => {
        if (!watchedData || fieldIndices.length === 0)
            return criteria.length;

        let incompleteCount = 0;

        for (let i = 0; i < fieldIndices.length; i++) {
            const ratingIndex = i * 2;
            // const justificationIndex = i * 2 + 1; // Removido

            const rating = watchedData[ratingIndex];
            // const justification = watchedData[justificationIndex]; // Removido

            const hasRating = typeof rating === 'number' && rating > 0;
            // const hasJustification = typeof justification === 'string' && justification.trim().length > 0; // Removido

            if (!hasRating) { // Removida exigência de justificativa
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
    const getCollaboratorDataForCriterion = (criterionId: number) => {
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
                                            <ManagerPillarRatingDisplay 
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
                        <ManagerAssessment
                            key={criterion.id}
                            criterionName={criterion.nome}
                            name={`managerAssessment.${fieldIndex}`}
                            topicNumber={index + 1}
                            isLast={index === criteria.length - 1}
                            collaboratorRating={collaboratorCriterionData?.rating}
                            collaboratorJustification={collaboratorCriterionData?.justification}
                            isReadOnly={isReadOnly}
                        />
                    );
                })}
            </div>
        </CollapsibleCardSection>
    );
});
