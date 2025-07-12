import { memo, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import RatingDisplay from '../common/RatingDisplay';

import type { Criterion } from '../../data/mockEvaluationPIllars';
import type { FullManagerEvaluationFormData } from '../../schemas/managerEvaluation';

interface ManagerPillarRatingDisplayProps {
    criteria: Criterion[];
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

    // Calcular média do colaborador para este pilar
    const collaboratorAverage = useMemo(() => {
        const criteriaInPillar = criteria.map(c => c.id);
        const collaboratorRatings = collaboratorData
            .filter(data => criteriaInPillar.includes(data.criterionId))
            .map(data => data.rating)
            .filter((rating): rating is number => typeof rating === 'number' && rating > 0);

        return collaboratorRatings.length > 0 
            ? Math.round((collaboratorRatings.reduce((sum, rating) => sum + rating, 0) / collaboratorRatings.length) * 10) / 10 
            : null;
    }, [criteria, collaboratorData]);    // Calcular média do manager para este pilar
    const managerAverage = useMemo(() => {
        if (!watchedManagerRatings || fieldIndices.length === 0) return null;

        const validRatings = watchedManagerRatings.filter((rating): rating is number => 
            typeof rating === 'number' && rating > 0
        );

        return validRatings.length > 0
            ? Math.round((validRatings.reduce((sum, rating) => sum + rating, 0) / validRatings.length) * 10) / 10
            : null;
    }, [watchedManagerRatings, fieldIndices.length]);

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
