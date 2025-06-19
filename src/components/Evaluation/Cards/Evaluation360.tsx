import React, { memo } from 'react';
import CollaboratorCard from '../../CollaboratorCard';
import StarRating from '../../StarRating';
import TextAreaWithTitle from '../../TextAreaWithTitle';
import Typography from '../../Typography';
import { Trash } from 'lucide-react';
import {
    type Collaborator,
    type CollaboratorEvaluation,
} from '../../../data/mockCollaborators';
import RatingDisplay from '../../RatingDisplay';
import CardContainer from '../../CardContainer';

interface CollaboratorEvaluation360Props {
    collaborator: Collaborator;
    evaluation?: CollaboratorEvaluation;
    onClearEvaluation: (collaboratorId: string) => void;
    onRatingChange: (collaboratorId: string, rating: number | null) => void;
    onFieldChange: (
        collaboratorId: string,
        field: 'pontosFortes' | 'pontosMelhoria',
        value: string,
    ) => void;
}

const CollaboratorEvaluation360: React.FC<CollaboratorEvaluation360Props> = ({
    collaborator,
    evaluation,
    onClearEvaluation,
    onRatingChange,
    onFieldChange,
}) => {
    return (
        <CardContainer>
            <div className="flex items-center justify-between mb-6">
                <CollaboratorCard
                    collaborator={collaborator}
                    variant="detailed"
                />
                <div className="flex items-center gap-4">
                    <RatingDisplay
                        rating={evaluation?.ratings?.general || null}
                    />
                    <button
                        title="Apagar avaliação"
                        onClick={() => onClearEvaluation(collaborator.id)}
                    >
                        <Trash
                            className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-700"
                            strokeWidth={2}
                        />
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <Typography
                    variant="body"
                    className="text-sm text-gray-600 mb-3"
                >
                    Dê uma avaliação de 1 a 5 ao colaborador
                </Typography>
                <StarRating
                    value={evaluation?.ratings?.general || null}
                    onChange={rating => onRatingChange(collaborator.id, rating)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextAreaWithTitle
                    title="Pontos fortes"
                    placeholder="Justifique sua nota"
                    value={evaluation?.pontosFortes || ''}
                    onChange={e =>
                        onFieldChange(
                            collaborator.id,
                            'pontosFortes',
                            e.target.value,
                        )
                    }
                />
                <TextAreaWithTitle
                    title="Pontos de melhoria"
                    placeholder="Justifique sua nota"
                    value={evaluation?.pontosMelhoria || ''}
                    onChange={e =>
                        onFieldChange(
                            collaborator.id,
                            'pontosMelhoria',
                            e.target.value,
                        )
                    }
                />
            </div>
        </CardContainer>
    );
};

const arePropsEqual = (
    prevProps: CollaboratorEvaluation360Props,
    nextProps: CollaboratorEvaluation360Props,
): boolean => {
    if (prevProps.collaborator.id !== nextProps.collaborator.id) {
        return false;
    }

    const prevEvaluationStr = JSON.stringify(prevProps.evaluation);
    const nextEvaluationStr = JSON.stringify(nextProps.evaluation);

    return (
        prevEvaluationStr === nextEvaluationStr &&
        prevProps.onClearEvaluation === nextProps.onClearEvaluation &&
        prevProps.onRatingChange === nextProps.onRatingChange &&
        prevProps.onFieldChange === nextProps.onFieldChange
    );
};

export default memo(CollaboratorEvaluation360, arePropsEqual);
