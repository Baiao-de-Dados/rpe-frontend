import React from 'react';
import CollaboratorCard from '../CollaboratorCard';
import TextAreaWithTitle from '../TextAreaWithTitle';
import Typography from '../Typography';
import { Trash } from 'lucide-react';
import {
    type Collaborator,
    type CollaboratorEvaluation,
} from '../../data/mockCollaborators';
import CardContainer from '../CardContainer';

interface ReferenceCardProps {
    collaborator: Collaborator;
    evaluation?: CollaboratorEvaluation;
    onClearReference: (collaboratorId: string) => void;
    onFieldChange: (
        collaboratorId: string,
        field: 'referencia',
        value: string,
    ) => void;
}

const ReferenceCard: React.FC<ReferenceCardProps> = ({
    collaborator,
    onClearReference,
    onFieldChange,
}) => {
    return (
        <CardContainer>
            <div className="flex items-center justify-between mb-6">
                <CollaboratorCard
                    collaborator={collaborator}
                    variant="detailed"
                />
                <button
                    title="Apagar referência"
                    onClick={() => onClearReference(collaborator.id)}
                >
                    <Trash
                        className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-700"
                        strokeWidth={2}
                    />
                </button>
            </div>

            <div className="mb-6">
                <Typography
                    variant="body"
                    className="text-sm text-gray-600 mb-3"
                >
                    Justifique sua escolha
                </Typography>
                <TextAreaWithTitle
                    title="Referência"
                    placeholder="Justifique sua nota"
                    value={''}
                    onChange={e =>
                        onFieldChange(
                            collaborator.id,
                            'referencia',
                            e.target.value,
                        )
                    }
                />
            </div>
        </CardContainer>
    );
};

export default ReferenceCard;
