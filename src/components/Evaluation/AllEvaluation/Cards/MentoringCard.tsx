import Typography from '../../../common/Typography';
import RatingDisplay from '../../../common/RatingDisplay';
import CardContainer from '../../../common/CardContainer';
import CollaboratorCard from '../../../common/CollaboratorCard';
import StarRating from '../../../common/StarRating';
import TextAreaWithTitle from '../../../common/TextAreaWithTitle';

interface MentoringProps {
    mentorName: string;
    mentoringRating: number;
    mentoringJustification: string;
}

const MentoringCard = ({ mentorName, mentoringRating, mentoringJustification }: MentoringProps) => {

    const mentor = {
        id: 1,
        name: mentorName,
        position: 'Mentor',
    };

    return (
        <CardContainer>
            <div className="flex items-center gap-4 mb-4">
                <CollaboratorCard collaborator={mentor} variant="compact" />
                <RatingDisplay rating={mentoringRating} className="ml-auto" />
            </div>
            <Typography variant="body" className="text-sm text-gray-600 mb-2">
                Sua avaliação de 1 à 5 ao seu mentor
            </Typography>
            <div className="mb-4">
                <StarRating value={mentoringRating ?? null} readOnly />
            </div>
            <TextAreaWithTitle
                title="Justificativa"
                placeholder="Justifique sua nota"
                value={mentoringJustification || ''}
                readOnly
                maxLength={1000}
            />
        </CardContainer>
    );
};

export default MentoringCard;
