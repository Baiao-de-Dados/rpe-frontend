import Typography from '../../../common/Typography';
import RatingDisplay from '../../../common/RatingDisplay';
import CardContainer from '../../../common/CardContainer';
import CollaboratorCard from '../../../common/CollaboratorCard';
import StarRating from '../../../common/StarRating';
import TextAreaWithTitle from '../../../common/TextAreaWithTitle';

interface MenteeEvaluationCardProps {
    menteeName: string;
    menteeCargo: string;
    rating: number;
    justification: string;
}

const MenteeEvaluationCard = ({ 
    menteeName, 
    menteeCargo, 
    rating, 
    justification 
}: MenteeEvaluationCardProps) => {

    const mentee = {
        id: 1,
        nome: menteeName,
        cargo: menteeCargo,
    };

    return (
        <CardContainer>
            <div className="flex items-center gap-4 mb-4">
                <CollaboratorCard collaborator={mentee} variant="compact" />
                <RatingDisplay rating={rating} className="ml-auto" />
            </div>
            <Typography variant="body" className="text-sm text-gray-600 mb-2">
                Avaliação de 1 à 5 dada ao mentor
            </Typography>
            <div className="mb-4">
                <StarRating value={rating ?? null} readOnly />
            </div>
            <TextAreaWithTitle
                title="Justificativa"
                placeholder="Justifique sua nota"
                value={justification || ''}
                readOnly
                maxLength={1000}
            />
        </CardContainer>
    );
};

export default MenteeEvaluationCard;
