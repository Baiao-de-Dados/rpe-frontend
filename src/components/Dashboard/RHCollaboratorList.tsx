import Typography from '../common/Typography';
import CardContainer from '../common/CardContainer';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { useNavigate } from 'react-router-dom';

interface Collaborator {
    id: number;
    name: string;
    department: string;
    status: 'Pendente' | 'Finalizado';
}

interface RHCollaboratorListProps {
    collaborators: Collaborator[];
}

export function RHCollaboratorList({ collaborators }: RHCollaboratorListProps) {
    const navigate = useNavigate();

    const getInitials = (name: string) =>
        name
            .split(' ')
            .map(part => part[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();

    return (
        <CardContainer className="p-4 h-full flex flex-col">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between mb-4">
                <Typography
                    variant="h1"
                    color="primary"
                    className="font-bold text-lg"
                >
                    Colaboradores
                </Typography>
                <Button
                    variant="link"
                    size="sm"
                    className="text-primary-500 font-bold"
                    onClick={() => navigate('/colaboradores')}
                >
                    Ver mais
                </Button>
            </div>

            {/* Lista rolável */}
            <div className="flex-1 flex flex-col max-h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent space-y-3 pr-2">
                {collaborators.map(collab => (
                    <div
                        key={collab.id}
                        className="
              flex items-center justify-between
              border border-gray-300 rounded-xl
              p-3 hover:bg-gray-50 transition-colors
            "
                    >
                        <div className="flex items-center space-x-3">
                            {/* Avatar */}
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-gray-700 font-semibold text-sm">
                                    {getInitials(collab.name)}
                                </span>
                            </div>

                            {/* Nome e departamento */}
                            <div className="min-w-0">
                                <Typography
                                    variant="body"
                                    className="font-semibold text-gray-900 truncate"
                                >
                                    {collab.name}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    className="text-gray-600 truncate"
                                >
                                    {collab.department}
                                </Typography>
                            </div>
                        </div>

                        {/* Badge reutilizado */}
                        <Badge
                            label={collab.status}
                            variant={
                                collab.status === 'Finalizado'
                                    ? 'success'
                                    : 'warning'
                            }
                            size="sm"
                        />
                    </div>
                ))}
            </div>
        </CardContainer>
    );
}
