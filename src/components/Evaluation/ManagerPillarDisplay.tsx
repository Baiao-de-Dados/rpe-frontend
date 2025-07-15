import { memo, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import RatingDisplay from '../common/RatingDisplay';

import type { FullManagerEvaluationFormData } from '../../schemas/managerEvaluation';

interface ManagerPillarRatingDisplayProps {
    criteria: Array<{
        id: number;
        nome: string;
        weight?: number; // Peso do critério
    }>;
    validFields: Array<{
        id: number;
        pilarId: number;
        criterionId: number;
        index: number;
    }>;
    // Dados do colaborador para calcular média
    collaboratorData?: Array<{
        criterionId: number;
        rating?: number | null;
        justification?: string;
    }>;
}

export const ManagerPillarRatingDisplay = memo(({ 
    criteria, 
    validFields, 
    collaboratorData = [] 
}: ManagerPillarRatingDisplayProps) => {

    const { control } = useFormContext<FullManagerEvaluationFormData>();

    const fieldIndices = useMemo(() => {
        return criteria
            .map(criterion =>
                validFields.findIndex(f => f.criterionId === criterion.id),
            )
            .filter(index => index !== -1);
    }, [criteria, validFields]);

    // Watch para as notas do manager
    const watchedManagerRatings = useWatch({
        control,
        name: fieldIndices.map(
            index => `managerAssessment.${index}.rating` as const,
        ),
    });

    // Calcular média ponderada do colaborador para este pilar
    const collaboratorAverage = useMemo(() => {
        const criteriaInPillar = criteria.map(c => c.id);
        const collaboratorRatingsWithWeights = collaboratorData
            .filter(data => criteriaInPillar.includes(data.criterionId))
            .map(data => {
                const criterion = criteria.find(c => c.id === data.criterionId);
                return {
                    rating: data.rating,
                    weight: criterion?.weight || 1
                };
            })
            .filter(item => typeof item.rating === 'number' && item.rating > 0 && typeof item.weight === 'number' && item.weight > 0);

        if (collaboratorRatingsWithWeights.length === 0) return null;

        const totalWeight = collaboratorRatingsWithWeights.reduce((sum, item) => sum + item.weight, 0);
        if (totalWeight === 0) return null;

        const weightedSum = collaboratorRatingsWithWeights.reduce((sum, item) => sum + (item.rating as number) * item.weight, 0);
        return Math.round((weightedSum / totalWeight) * 10) / 10;
    }, [criteria, collaboratorData]);

    // Calcular média ponderada do manager para este pilar
    const managerAverage = useMemo(() => {
        if (!watchedManagerRatings || fieldIndices.length === 0) return null;

        const managerRatingsWithWeights = fieldIndices.map((fieldIndex, index) => {
            const criterion = criteria[index];
            const rating = watchedManagerRatings[index];
            return {
                rating,
                weight: criterion?.weight || 1
            };
        }).filter(item => typeof item.rating === 'number' && item.rating > 0 && typeof item.weight === 'number' && item.weight > 0);

        if (managerRatingsWithWeights.length === 0) return null;

        const totalWeight = managerRatingsWithWeights.reduce((sum, item) => sum + item.weight, 0);
        if (totalWeight === 0) return null;

        const weightedSum = managerRatingsWithWeights.reduce((sum, item) => sum + (item.rating as number) * item.weight, 0);
        return Math.round((weightedSum / totalWeight) * 10) / 10;
    }, [watchedManagerRatings, criteria, fieldIndices]);

    return (
        <div className="flex items-center gap-2">
            {/* Nota média do colaborador - texto preto */}
            <div className="group relative">
                <RatingDisplay 
                    rating={collaboratorAverage} 
                    className="!text-black font-bold"
                />
                {/* Tooltip para colaborador */}
                <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-[9999] shadow-lg">
                    Média - Colaborador
                </div>
            </div>

            {/* Nota média do manager - background primary-500 com texto branco */}
            <div className="group relative">
                <RatingDisplay 
                    rating={managerAverage} 
                    className="!bg-primary-500 !text-white font-bold"
                />
                {/* Tooltip para manager */}
                <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-[9999] shadow-lg">
                    Média - Manager
                </div>
            </div>
        </div>
    );
});

export default ManagerPillarRatingDisplay;
