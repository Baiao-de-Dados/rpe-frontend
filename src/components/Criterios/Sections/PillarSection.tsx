import { mockTracks } from '../../../data/mockTracks';
import { AddPillarButton } from '../Buttons/AddPillarButton';
import { PillarCard } from '../Cards/PillarCard';

export function PillarSection() {
    const pillars = mockTracks[0]?.sections || [];

    return (
        <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
            <AddPillarButton />
            {pillars.map(section => (
                <PillarCard
                    key={section.id}
                    title={section.title}
                    criteriaCount={section.criteria.length}
                />
            ))}
        </div>
    );
}
