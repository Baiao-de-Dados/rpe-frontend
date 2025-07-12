import { memo, useEffect } from 'react';
import { useQueryState } from 'nuqs';

import CollapsibleCardSection from '../../common/CollapsibleCardSection';
import Typography from '../../common/Typography';
import ManagerAssessment from '../CardsManager/ManagerAssessment';
import ManagerPillarRatingDisplay from '../ManagerPillarDisplay';

import type { Criterion } from '../../../data/mockEvaluationPIllars';

interface ReadOnlyManagerPillarSectionProps {
    pillarTitle: string;
    criteria: Criterion[];
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
}

export const ReadOnlyManagerPillarSection = memo(({ 
    pillarTitle, 
    criteria, 
    validFields,
    collaboratorData = [],
}: ReadOnlyManagerPillarSectionProps) => {

    const [pillarOpenList, setPillarOpenList] = useQueryState('committee_pillar_open', {
        defaultValue: '',
        history: 'replace',
    });

    const pillarId = pillarTitle;
    const openArray = pillarOpenList ? pillarOpenList.split(',') : [];
    const isOpen = openArray.includes(pillarId);

    const toggleMinimized = () => {
        if (isOpen) {
            setPillarOpenList(openArray.filter(id => id !== pillarId).join(','));
        } else {
            setPillarOpenList([...openArray, pillarId].join(','));
        }
    };

    useEffect(() => {}, [pillarOpenList]);

    // Função para buscar os dados do colaborador para um critério específico
    const getCollaboratorDataForCriterion = (criterionId: number) => {
        return collaboratorData.find(data => data.criterionId === criterionId);
    };

    return (
        <CollapsibleCardSection
            title={`Avaliação de ${pillarTitle}`}
            // Remover a badge de pendente para o comitê
            notificationBadge={undefined}
            headerRight={
                <div className="flex items-center gap-2 whitespace-nowrap">
                    <ManagerPillarRatingDisplay 
                        criteria={criteria} 
                        validFields={validFields}
                        collaboratorData={collaboratorData}
                    />
                    <div className="flex items-center bg-primary-50 px-2 py-1 rounded-lg">
                        <Typography variant="caption" color="muted" className="text-xs">
                            {criteria.length} critérios
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
                            isReadOnly={true}
                        />
                    );
                })}
            </div>
        </CollapsibleCardSection>
    );
});
