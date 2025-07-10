import { memo, useMemo } from 'react';

import type { PillarCriteria } from '../../../data/mockEvaluations';
import RatingDisplay from '../../common/RatingDisplay';

interface PillarRatingDisplayProps {
    criteria: PillarCriteria[];
    ratingKey?: 'rating' | 'managerRating';
}

export const PillarRatingDisplay = memo(({ criteria, ratingKey = 'rating' }: PillarRatingDisplayProps) => {
    const average = useMemo(() => {
        if (!criteria || criteria.length === 0) return null;
        const validRatings = criteria.filter(c => typeof c[ratingKey] === 'number' && c[ratingKey]! > 0 && typeof c.weight === 'number' && c.weight > 0);
        const totalWeight = validRatings.reduce((sum, c) => sum + c.weight, 0);
        if (totalWeight === 0) return null;
        const weightedSum = validRatings.reduce((sum, c) => sum + (c[ratingKey]! as number) * c.weight, 0);
        return Math.round((weightedSum / totalWeight) * 10) / 10;
    }, [criteria, ratingKey]);

    return <RatingDisplay rating={average} pillar final={ratingKey === 'managerRating'} />;
});
