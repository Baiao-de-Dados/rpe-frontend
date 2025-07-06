import { useQueryState } from 'nuqs';
import { Controller } from 'react-hook-form';
import type { Control, FieldErrors } from 'react-hook-form';

import { EditableCriterion } from '../EditableCriterion';

import Typography from '../../common/Typography';
import RatingDisplay from '../../common/RatingDisplay';
import CollapsibleCardSection from '../../common/CollapsibleCardSection';

import type { TrackSectionFormType } from '../../../schemas/trackSectionSchema';

interface TrackCardProps {
    track: TrackSectionFormType['tracks'][number];
    trackIdx: number;
    control: Control<TrackSectionFormType>;
    isCycleClosed: boolean;
    errors?: FieldErrors<TrackSectionFormType['tracks'][number]>;
}

export default function TrackCard({ track, trackIdx, control, isCycleClosed }: TrackCardProps) {

    const [openTracks, setOpenTracks] = useQueryState('open_tracks', {
        defaultValue: '',
        history: 'replace',
    });

    const id = track?.name;
    const openArray = openTracks ? openTracks.split(',') : [];
    const isOpen = openArray.includes(id);

    const handleToggle = () => {
        let newArray: string[];
        if (isOpen) {
            newArray = openArray.filter(t => t !== id);
        } else {
            newArray = [...openArray, id];
        }
        setOpenTracks(newArray.join(','));
    };

    return (
        <CollapsibleCardSection title={`Trilha de ${track?.name}`} track={track} defaultOpen={false} onHeaderClick={handleToggle} isOpen={isOpen}>
            <div className="space-y-4 mt-4">
                {track?.pillars.map((pillar, pillarIdx) => {
                    const sumPesos = pillar.criteria.filter(c => c.isActive).reduce((acc, c) => acc + (c.weight ? Number(c.weight) : 0), 0);
                    return (
                        <div key={pillar.id} className="rounded-xl p-4 border border-gray-200 sm:p-6">
                            <div className="flex items-center gap-2">
                                <Typography variant="h1" color='secondary' className="text-base sm:text-lg">
                                    {pillar.name}
                                </Typography>
                                <RatingDisplay rating={pillar.criteria.some(c => c.isActive) ? sumPesos : null} suffix="%" min={100} max={100} />
                            </div>
                            <span className="text-gray-500 text-xs mb-12">A soma dos pesos deve ser 100%</span>
                            <div className="divide-y mt-2">
                                {
                                    pillar.criteria?.map((criterion, criterionIdx) => 
                                    <Controller key={criterion.id} control={control} 
                                    name={`tracks.${trackIdx}.pillars.${pillarIdx}.criteria.${criterionIdx}` as const} 
                                    render={
                                        ({ field }) => 
                                        <EditableCriterion value={field.value} onChange={field.onChange} 
                                        isCycleClosed={isCycleClosed}/>
                                    } />)
                                }
                            </div>
                        </div>
                    );
                })}
            </div>
        </CollapsibleCardSection>
    );
}
