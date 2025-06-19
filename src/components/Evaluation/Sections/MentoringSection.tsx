import MentoringCard from '../Cards/Mentoring';

interface MentoringSectionProps {
    mentoringRating: number | null;
    mentoringJustification: string;
    setMentoringRating: (rating: number | null) => void;
    setMentoringJustification: (justification: string) => void;
}

export function MentoringSection({
    mentoringRating,
    mentoringJustification,
    setMentoringRating,
    setMentoringJustification,
}: MentoringSectionProps) {
    return (
        <section>
            <MentoringCard
                rating={mentoringRating}
                justification={mentoringJustification}
                onRatingChange={setMentoringRating}
                onJustificationChange={setMentoringJustification}
            />
        </section>
    );
}
