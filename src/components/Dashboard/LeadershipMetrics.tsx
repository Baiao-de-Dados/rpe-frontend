import { Users, UserX, CheckCircle } from 'lucide-react';

import Typography from '../common/Typography';
import CardContainer from '../common/CardContainer';
import ProgressCircle from '../common/ProgressCircle';

import { CHART_COLORS } from '../../utils/colorUtils';

interface LeadershipMetricsProps {
    totalLeaders: number;
    completionPercentage: number;
    collaboratorsWithoutLeader: number;
    totalCollaborators: number; // Added new prop
}

export function LeadershipMetrics({totalLeaders, completionPercentage, collaboratorsWithoutLeader, totalCollaborators}: LeadershipMetricsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">

            <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                <div className="flex flex-col flex-1 min-w-0">
                    <Typography variant="h2" className="text-lg font-bold mb-5">
                        Seus líderes
                    </Typography>
                    <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: CHART_COLORS.EXCELLENT }}>
                        <Typography variant="caption" className="text-gray-500 max-w-[20rem] leading-5">
                            Você possui{' '}
                            <span className="font-semibold" style={{ color: CHART_COLORS.EXCELLENT }}>
                                {totalLeaders}
                            </span>{' '}
                            {totalLeaders === 1 ? 'líder' : 'líderes'} sob sua gestão
                        </Typography>
                    </div>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    <Users className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: CHART_COLORS.EXCELLENT }} />
                    <span className="text-4xl sm:text-5xl font-bold" style={{ color: CHART_COLORS.EXCELLENT }}>
                        {totalLeaders}
                    </span>
                </div>

            </CardContainer>

            <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                <div className="flex flex-col flex-1 min-w-0">
                    <Typography variant="h2" className="text-lg font-bold mb-5">
                        Preenchimento de avaliação
                    </Typography>
                    <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: CHART_COLORS.GOOD }}>
                        <Typography variant="caption" className="text-gray-500 max-w-[12rem] leading-5">
                            <span className="font-semibold" style={{ color: CHART_COLORS.GOOD }}>
                                {completionPercentage}%
                            </span>{' '}
                            dos líderes já fecharam suas avaliações
                        </Typography>
                    </div>
                </div>
                <ProgressCircle percentage={completionPercentage} />
            </CardContainer>

            {collaboratorsWithoutLeader === 0 ? (
                <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                    <div className="flex flex-col flex-1 min-w-0">
                        <Typography variant="h2" className="text-lg font-bold mb-5">
                            Atribuições completas
                        </Typography>
                        <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: CHART_COLORS.EXCELLENT }}>
                            <Typography variant="caption" className="text-gray-500 max-w-[20rem] leading-5">
                                Todos os{' '}
                                <span className="font-semibold" style={{ color: CHART_COLORS.EXCELLENT }}>
                                    {totalCollaborators}
                                </span>{' '}
                                colaboradores já foram associados a um líder.
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                        <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: CHART_COLORS.EXCELLENT }} />
                        <span className="text-4xl sm:text-5xl font-bold" style={{ color: CHART_COLORS.EXCELLENT }}>
                            {totalCollaborators}
                        </span>
                    </div>
                </CardContainer>
            ) : (
                <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                    <div className="flex flex-col flex-1 min-w-0">
                        <Typography variant="h2" className="text-lg font-bold mb-5">
                            Atribuições incompletas
                        </Typography>
                        <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: CHART_COLORS.BELOW }}>
                            <Typography variant="caption" className="text-gray-500 max-w-[20rem] leading-5">
                                Você possui{' '}
                                <span className="font-semibold" style={{ color: CHART_COLORS.BELOW }}>
                                    {collaboratorsWithoutLeader}
                                </span>{' '}
                                {collaboratorsWithoutLeader === 1 ? 'colaborador' : 'colaboradores'} ainda não associado{collaboratorsWithoutLeader === 1 ? '' : 's'} a um líder
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                        <UserX className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: CHART_COLORS.BELOW }} />
                        <div className="flex flex-col items-center">
                            <span className="text-4xl sm:text-5xl font-bold" style={{ color: CHART_COLORS.BELOW }}>
                                {collaboratorsWithoutLeader}
                            </span>
                        </div>
                    </div>
                </CardContainer>
            )}
        </div>
    );
}
