import React from 'react';
import Avatar from './Avatar';
import Typography from './Typography';
import { type Collaborator } from '../../data/mockCollaborators';

interface CollaboratorCardProps {
    collaborator: Collaborator;
    variant?: 'compact' | 'detailed';
    className?: string;
}

const CollaboratorCard: React.FC<CollaboratorCardProps> = ({
    collaborator,
    variant = 'compact',
    className = '',
}) => {
    if (variant === 'compact') {
        return (
            <div className={`flex items-center gap-4 ${className}`}>
                <Avatar name={collaborator.nome} />
                <div className="flex-1 min-w-0">
                    <Typography
                        variant="body"
                        className="font-semibold text-gray-800 truncate"
                    >
                        {collaborator.nome}
                    </Typography>
                    <Typography
                        variant="body"
                        className="text-sm text-gray-500 truncate"
                    >
                        {collaborator.cargo}
                    </Typography>
                </div>
            </div>
        );
    }

    // variant === 'detailed'
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <Avatar name={collaborator.nome} />
            <div>
                <Typography
                    variant="h3"
                    className="text-lg font-semibold text-primary-600"
                >
                    {collaborator.nome}
                </Typography>
                <Typography variant="body" className="text-gray-500">
                    {collaborator.cargo}
                </Typography>
            </div>
        </div>
    );
};

export default CollaboratorCard;
