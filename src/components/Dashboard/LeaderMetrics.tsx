import Typography from '../common/Typography';
import CardContainer from '../common/CardContainer';
import { LuUsers, LuClipboardCheck } from 'react-icons/lu';
import { CHART_COLORS, getScoreColor } from '../../utils/colorUtils';
import ProgressCircle from '../common/ProgressCircle';
import { FaStar } from 'react-icons/fa';

interface LeaderMetricsProps {
    cycleStatus: 'open' | 'closed';
    totalLeadership: number;
    reviewsCompleted: number;
    completionPercentage: number;
    pendingReviews: number;
    averageManagerScore: number;
    averageLeaderScore: number; 
}

export function LeaderMetrics({
    cycleStatus,
    totalLeadership,
    reviewsCompleted,
    completionPercentage,
    pendingReviews,
    averageManagerScore,
    averageLeaderScore

}: LeaderMetricsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">

            <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                <div className="flex flex-col flex-1 min-w-0">
                    <Typography variant="h2" className="text-xl font-bold mb-5">
                        {cycleStatus === 'open' ? 'Meus liderados' : 'Avaliações concluídas'}
                    </Typography>
                    <div className="flex items-center border-l-4 pl-4 min-h-[4rem]" style={{ borderLeftColor: CHART_COLORS.EXCELLENT }}>
                        <Typography
                            variant="caption"
                            className="max-w-[20rem] leading-5"
                        >
                            {cycleStatus === 'open' ? (
                                <>Você tem <span className="font-semibold" style={{ color: CHART_COLORS.EXCELLENT }}>{totalLeadership}</span> liderados sob sua gestão</>
                            ) : (
                                <>Você concluiu <span className="font-semibold" style={{ color: CHART_COLORS.EXCELLENT }}>{reviewsCompleted}</span> de {totalLeadership} avaliações</>
                            )}
                        </Typography>
                    </div>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    {cycleStatus === 'open' ? (
                        <LuUsers className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: CHART_COLORS.EXCELLENT }} />
                    ) : (
                        <LuClipboardCheck className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: CHART_COLORS.EXCELLENT }} />
                    )}
                    <div className="flex flex-col items-center">
                        <span
                            className="text-4xl sm:text-5xl font-bold"
                            style={{ color: CHART_COLORS.EXCELLENT }}
                        >
                            {cycleStatus === 'open' ? totalLeadership : reviewsCompleted}
                        </span>
                        <span
                            className="font-bold text-sm sm:text-base"
                            style={{ color: CHART_COLORS.EXCELLENT }}
                        >
                        </span>
                    </div>
                </div>
            </CardContainer>

            {cycleStatus === 'open' ? (
                <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                    <div className="flex flex-col flex-1 min-w-0">
                        <Typography variant="h2" className="text-lg font-bold mb-5">
                            Preenchimento das avaliações
                        </Typography>
                        <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: CHART_COLORS.GOOD }}>
                            <Typography
                                variant="caption"
                                className="max-w-[20rem] leading-5"
                            >
                                <span className="font-semibold" style={{ color: CHART_COLORS.GOOD }}>
                                    {completionPercentage}%
                                </span>{' '}
                                dos seus liderados já concluiram suas avaliações
                            </Typography>
                        </div>
                    </div>
                    <ProgressCircle percentage={completionPercentage} />
                </CardContainer>
            ) : (
                <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                    <div className="flex flex-col flex-1 min-w-0">
                        <Typography variant="h2" className="text-lg font-bold mb-5">
                            Média das suas notas
                        </Typography>
                        <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: getScoreColor(averageLeaderScore) }}>
                            <Typography
                                variant="caption"
                                className="max-w-[20rem] leading-5"
                            >
                                <span className="font-semibold" style={{ color: getScoreColor(averageLeaderScore) }}>
                                    {averageLeaderScore}
                                </span>{' '}
                                foi a média das avaliações feitas por você para seus liderados
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-center min-w-[7rem] h-full gap-2">
                        <FaStar className="w-10 h-10" style={{ color: getScoreColor(averageLeaderScore) }} />
                        <span className="text-4xl sm:text-5xl font-bold leading-none" style={{ color: getScoreColor(averageLeaderScore) }}>
                            {averageLeaderScore.toFixed(1)}
                        </span>
                    </div>
                </CardContainer>
            )}

            {cycleStatus === 'open' ? (
                <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                    <div className="flex flex-col flex-1 min-w-0">
                        <Typography variant="h2" className="text-lg font-bold mb-5">
                            Avaliações não concluidas
                        </Typography>
                        <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: CHART_COLORS.BELOW }}>
                            <Typography
                                variant="caption"
                                className="max-w-[20rem] leading-5"
                            >
                                Você possui{' '}
                                <span className="font-semibold" style={{ color: CHART_COLORS.BELOW }}>
                                    {completionPercentage}
                                </span>{' '}
                                avaliações pendentes
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                        <LuClipboardCheck className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: CHART_COLORS.BELOW }} />
                        <span className="text-4xl sm:text-5xl font-bold" style={{ color: CHART_COLORS.BELOW }}>
                            {pendingReviews}
                        </span>
                    </div>
                </CardContainer>
            ) : (
                <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                    <div className="flex flex-col flex-1 min-w-0">
                        <Typography variant="h2" className="text-lg font-bold mb-5">
                            Média das notas do Gestor
                        </Typography>
                        <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: getScoreColor(averageManagerScore) }}>
                            <Typography
                                variant="caption"
                                className="max-w-[20rem] leading-5"
                            >   
                                <span className="font-semibold" style={{ color: getScoreColor(averageManagerScore) }}>
                                    {averageManagerScore}
                                </span>{' '}
                                foi a média das avaliações feitas pelo Gestor para seus liderados
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-center min-w-[7rem] h-full gap-2">
                        <FaStar className="w-10 h-10" style={{ color: getScoreColor(averageManagerScore) }} />
                        <span className="text-4xl sm:text-5xl font-bold leading-none" style={{ color: getScoreColor(averageManagerScore) }}>
                            {averageManagerScore.toFixed(1)}
                        </span>
                    </div>
                </CardContainer>
            )}

        </div>
    );
}
