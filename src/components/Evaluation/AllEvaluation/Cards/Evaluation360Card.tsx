import CardContainer from '../../../common/CardContainer';
import CollaboratorCard from '../../../common/CollaboratorCard';
import StarRating from '../../../common/StarRating';
import RatingDisplay from '../../../common/RatingDisplay';
import TextAreaWithTitle from '../../../common/TextAreaWithTitle';
import Typography from '../../../common/Typography';

interface Evaluation360CardProps {
    collaborator: { 
        id: string; 
        nome: string; 
        cargo: string 
    };
    rating: number;
    strengths: string;
    improvements: string;
}

function Evaluation360Card({ collaborator, rating, strengths, improvements }: Evaluation360CardProps) {
    return (
        <CardContainer>
            <div className="flex items-center gap-4 mb-4">
                <CollaboratorCard collaborator={collaborator} variant="compact" />
                <RatingDisplay rating={rating} className="ml-auto" />
            </div>
            <Typography variant="body" className="text-sm text-gray-600 mb-2">
                Sua avaliação de 1 à 5 ao colaborador
            </Typography>
            <div className="mb-4">
                <StarRating value={rating ?? null} readOnly />
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <TextAreaWithTitle
                        title="Pontos fortes"
                        placeholder="Descreva os principais pontos fortes deste colaborador..."
                        value={strengths}
                        readOnly
                        maxLength={1000}
                    />
                </div>
                <div className="flex-1">
                    <TextAreaWithTitle
                        title="Pontos de melhoria"
                        placeholder="Descreva os principais pontos de melhoria para este colaborador..."
                        value={improvements}
                        readOnly
                        maxLength={1000}
                    />
                </div>
            </div>
        </CardContainer>
    );
}

export default Evaluation360Card;
