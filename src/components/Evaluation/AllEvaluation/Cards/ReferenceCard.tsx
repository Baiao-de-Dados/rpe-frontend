import CardContainer from '../../../common/CardContainer';
import CollaboratorCard from '../../../common/CollaboratorCard';
import TextAreaWithTitle from '../../../common/TextAreaWithTitle';

import type { Collaborator } from '../../../../types/collaborator';

interface ReferenceCardProps {
    collaborator: Partial<Pick<Collaborator, 'name' | 'position'>>;
    justification: string;
}

const ReferenceCard = ({ collaborator, justification }: ReferenceCardProps) => {
    return (
        <CardContainer>
            <div className="flex items-center justify-between mb-4">
                <CollaboratorCard collaborator={collaborator} variant="compact" />
            </div>
            <TextAreaWithTitle
                title="Sua justificativa"
                placeholder="Escreva sobre este colaborador como referência..."
                value={justification}
                readOnly
                maxLength={1000}
            />
        </CardContainer>
    );
};

export default ReferenceCard;
