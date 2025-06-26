import { useQueryState } from 'nuqs';

import Typography from '../../common/Typography';
import CollapsibleCardSection from '../../common/CollapsibleCardSection';
import { EditableCriterion } from '../EditableCriterion';

interface Section {
    id: string;
    title: string;
    criteria: Array<{
        id: string;
        name: string;
        weight?: string;
        description?: string;
        required?: boolean;
    }>;
}

interface TrackCardProps {
    trackTitle: string;
    pillars: Section[];
    isCycleClosed?: boolean;
}

export default function TrackCard({
    trackTitle,
    pillars,
    isCycleClosed = false,
}: TrackCardProps) {
    const [openTracks, setOpenTracks] = useQueryState('open_tracks', {
        defaultValue: '',
        history: 'replace',
    });
    const id = trackTitle;
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
        <CollapsibleCardSection
            title={`Trilha de ${trackTitle}`}
            defaultOpen={false}
            onHeaderClick={handleToggle}
            isOpen={isOpen}
        >
            <div className="space-y-4 mt-4">
                {pillars.map(pillar => (
                    <div
                        key={pillar.id}
                        className="rounded-xl p-4 border border-gray-200 sm:p-6"
                    >
                        <Typography
                            variant="h3"
                            className="font-semibold mb-4 text-base sm:text-lg"
                        >
                            {pillar.title}
                        </Typography>
                        <div className="divide-y">
                            {pillar.criteria?.map(criterion => (
                                <EditableCriterion
                                    key={criterion.id}
                                    criterion={criterion}
                                    isCycleClosed={isCycleClosed}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </CollapsibleCardSection>
    );
}
