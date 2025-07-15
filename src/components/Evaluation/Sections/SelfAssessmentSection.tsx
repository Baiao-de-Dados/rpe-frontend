import { useEffect, useMemo, memo, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { PillarSection } from '../PillarSection';

import type { EvaluationFormData } from '../../../schemas/evaluation';
import { useCycleCriteriaQuery } from '../../../hooks/api/useCollaboratorQuery';
import { useAuth } from '../../../hooks/useAuth';
import type { TrackCriterion, TrackPillar } from '../../../types/track';


export const SelfAssessmentSection = memo(() => {

    const { control } = useFormContext<EvaluationFormData>();
    const isInitialized = useRef(false);

    const { user, loading: authLoading } = useAuth();
    const [readyTrackId, setReadyTrackId] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (!authLoading && typeof user?.trackId === 'number' && user.trackId > 0) {
            setReadyTrackId(user.trackId);
        } else {
            setReadyTrackId(undefined);
        }
    }, [authLoading, user]);

    const { data: trackData, isLoading } = useCycleCriteriaQuery(readyTrackId, { enabled: !!readyTrackId });

    const { fields, replace } = useFieldArray({
        control,
        name: 'selfAssessment',
    });

    useEffect(() => {
        if (!trackData || isLoading) return;
        const allCriteria = (trackData.pillars ?? []).flatMap((pillar: TrackPillar) =>
            pillar.criteria.map((criterion: TrackCriterion) => ({
                pilarId: pillar.id,
                criterionId: criterion.id,
                rating: null,
                justification: '',
                selfAssessmentIAValid: true,
            }))
        );
        if ((!fields || fields.length !== allCriteria.length) && !isInitialized.current) {
            replace(allCriteria);
            isInitialized.current = true;
        }
    }, [fields, replace, trackData, isLoading]);

    const validFields = useMemo(() =>
        fields.map((field, index) => ({
            id: index,
            pilarId: field.pilarId,
            criterionId: field.criterionId,
            selfAssessmentIAValid: field.selfAssessmentIAValid,
            index: index,
        })),
        [fields],
    );

    if (authLoading || isLoading || !trackData) {
        return (
            <div className="flex justify-center items-center py-8">
                <Loader2 className="animate-spin h-8 w-8 text-primary-500" />
            </div>
        );
    }

    return (
        <section>
            <div className="space-y-8">
                {(trackData.pillars ?? []).map((pillar: TrackPillar) => (
                    <PillarSection
                        key={pillar.id}
                        pillarTitle={pillar.name}
                        criteria={pillar.criteria}
                        validFields={validFields}
                    />
                ))}
            </div>
        </section>
    );
});
