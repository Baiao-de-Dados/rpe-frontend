import Typography from '../Typography';
import CollapsibleCardSection from '../common/CollapsibleCardSection';

interface Section {
    id: string;
    title: string;
}

interface TrackSectionProps {
    trackTitle: string;
    sections: Section[];
}

export default function TrackSection({
    trackTitle,
    sections,
}: TrackSectionProps) {
    return (
        <CollapsibleCardSection title={`Trilha de ${trackTitle}`}>
            <div className="space-y-4">
                {sections.map(section => (
                    <div
                        key={section.id}
                        className="bg-gray-50 rounded p-4 border"
                    >
                        <Typography variant="h3" className="font-semibold mb-2">
                            {section.title}
                        </Typography>
                    </div>
                ))}
            </div>
        </CollapsibleCardSection>
    );
}
