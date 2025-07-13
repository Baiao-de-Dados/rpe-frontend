import Avatar from './Avatar';
import Typography from './Typography';

import type { Collaborator } from '../../types/collaborator';

interface CollaboratorCardProps {
    collaborator: Partial<Pick<Collaborator, 'name' | 'position'>>;
    variant?: 'compact' | 'detailed';
    className?: string;
}

function CollaboratorCard({ collaborator, variant = 'compact', className = '' }: CollaboratorCardProps) {

    const name = collaborator.name ?? '';
    const position = collaborator.position ?? '';

    if (variant === 'compact') {
        return (
            <div className={`flex items-center gap-4 ${className}`}>
                <Avatar name={name} />
                <div className="flex-1 min-w-0">
                    <Typography variant="body" className="font-semibold text-gray-800 truncate">
                        {name}
                    </Typography>
                    <Typography variant="body" className="text-sm text-gray-500 truncate">
                        {position}
                    </Typography>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <Avatar name={name} />
            <div>
                <Typography variant="h3" className="text-lg font-semibold text-primary-600">
                    {name}
                </Typography>
                <Typography variant="body" className="text-gray-500">
                    {position}
                </Typography>
            </div>
        </div>
    );
}

export default CollaboratorCard;
