import { memo, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import RatingDisplay from '../RatingDisplay';
import type { Criterion } from '../../data/mockEvaluationPIllars';
import type { EvaluationFormData } from '../../schemas/evaluation';

interface PillarRatingDisplayProps {
    criteria: Criterion[];
    validFields: Array<{ id: string; criterionId: string }>;
}

export const PillarRatingDisplay = memo(
    ({ criteria, validFields }: PillarRatingDisplayProps) => {
        const { control } = useFormContext<EvaluationFormData>();

        const fieldIndices = useMemo(() => {
            return criteria
                .map(criterion =>
                    validFields.findIndex(f => f.criterionId === criterion.id),
                )
                .filter(index => index !== -1);
        }, [criteria, validFields]);

        const watchedRatings = useWatch({
            control,
            name: fieldIndices.map(
                index => `selfAssessment.${index}.rating` as const,
            ),
        });

        const average = useMemo(() => {
            if (!watchedRatings || fieldIndices.length === 0) return null;

            const validRatings = watchedRatings.filter(
                (rating): rating is number =>
                    typeof rating === 'number' && rating > 0,
            );

            return validRatings.length > 0
                ? Math.round(
                      (validRatings.reduce((sum, rating) => sum + rating, 0) /
                          validRatings.length) *
                          10,
                  ) / 10
                : null;
        }, [watchedRatings, fieldIndices.length]);

        return <RatingDisplay rating={average} />;
    },
);
