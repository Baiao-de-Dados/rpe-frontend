import { useNavigate } from 'react-router-dom';

import { useCycle } from '../../hooks/useCycle';

import Badge from '../common/Badge';
import Button from '../common/Button';
import Typography from '../common/Typography';
import CardContainer from '../common/CardContainer';

import type { GetRHCollaborators } from '../../types/rh';

interface RHCollaboratorListProps {
    evaluationsSummary: GetRHCollaborators[];
}

export function RHCollaboratorList({ evaluationsSummary }: RHCollaboratorListProps) {

    const navigate = useNavigate();

    const { currentCycle, status } = useCycle();

    const getInitials = (name: string) =>
        name
            .split(' ')
            .map(part => part[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();

    return (
        <CardContainer className="p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <Typography variant="h1" color="primary" className="font-bold text-lg">
                    Colaboradores
                </Typography>
                <Button variant="link" size="sm" className="text-primary-500 font-bold" onClick={() => navigate('/colaboradores')} >
                    Ver mais
                </Button>
            </div>

            <div className="flex-1 flex flex-col max-h-full overflow-y-auto overflow-x-hidden custom-scrollbar space-y-3 pr-2">
                {(status === 'upcoming' || status === 'undefined') ? (
                    <div className="flex flex-1 items-center justify-center">
                        <Typography variant="caption" color="muted" className="w-full text-center">
                            O ciclo {currentCycle.name} de avaliação ainda não começou
                        </Typography>
                    </div>
                ) : (
                    evaluationsSummary.map(summary => (
                        console.log(summary),
                        <div key={summary.id} className="flex items-center justify-between border border-gray-300 rounded-xl p-3 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                    <span className="text-gray-700 font-semibold text-sm">
                                        {getInitials(summary.name)}
                                    </span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 sm:block">
                                        <Typography variant="body" className="font-semibold text-gray-900 truncate">
                                            {summary.name}
                                        </Typography>
                                        <div className="sm:hidden">
                                            <Badge
                                                label={typeof summary.autoEvaluationScore === 'number' ? 'Finalizado' : 'Pendente'}
                                                variant={typeof summary.autoEvaluationScore === 'number' ? 'success' : 'warning'}
                                                size="sm"
                                            />
                                        </div>
                                    </div>
                                    <Typography variant="caption" className="text-gray-600 truncate">
                                        {summary.position}
                                    </Typography>
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <Badge
                                    label={typeof summary.autoEvaluationScore === 'number' ? 'Finalizado' : 'Pendente'}
                                    variant={typeof summary.autoEvaluationScore === 'number' ? 'success' : 'warning'}
                                    size="sm"
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </CardContainer>
    );
}
