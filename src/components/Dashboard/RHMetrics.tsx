import { LuFilePen, LuCalendarCheck2 } from 'react-icons/lu';

import Typography from '../common/Typography';
import CardContainer from '../common/CardContainer';
import ProgressCircle from '../common/ProgressCircle';

import { CHART_COLORS } from '../../utils/colorUtils';

interface RHMetricsProps {
    pendingEvaluations: number;
    completionPercentage: number;
    daysUntilClosure?: number;
    closureDate?: string;
}

export function RHMetrics({
    pendingEvaluations,
    completionPercentage,
    daysUntilClosure,
    closureDate,
}: RHMetricsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
            {/* Card 1: Preenchimento de avaliação */}
            <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                <div className="flex flex-col flex-1 min-w-0">
                    <Typography variant="h2" className="text-lg font-bold mb-5">
                        Preenchimento de avaliação
                    </Typography>
                    <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: CHART_COLORS.GOOD }}>
                        <Typography
                            variant="caption"
                            className="text-gray-500 max-w-[12rem] leading-5"
                        >
                            <span className="font-semibold" style={{ color: CHART_COLORS.GOOD }}>
                                {completionPercentage}%
                            </span>{' '}
                            dos colaboradores já fecharam suas avaliações
                        </Typography>
                    </div>
                </div>
                <ProgressCircle percentage={completionPercentage} />
            </CardContainer>

            {/* Card 2: Avaliações pendentes */}
            <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                <div className="flex flex-col flex-1 min-w-0">
                    <Typography variant="h2" className="text-lg font-bold mb-5">
                        Avaliações pendentes
                    </Typography>
                    <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: CHART_COLORS.BELOW }}>
                        <Typography
                            variant="caption"
                            className="text-gray-500 max-w-[20rem] leading-5"
                        >
                            <span className="font-semibold" style={{ color: CHART_COLORS.BELOW }}>
                                {pendingEvaluations}
                            </span>{' '}
                            colaboradores ainda não fecharam sua avaliação
                        </Typography>
                    </div>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    <LuFilePen className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: CHART_COLORS.BELOW }} />
                    <span
                        className="text-4xl sm:text-5xl font-bold"
                        style={{ color: CHART_COLORS.BELOW }}
                    >
                        {pendingEvaluations}
                    </span>
                </div>
            </CardContainer>

            {/* Card 3: Fechamento de ciclo */}
            <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                <div className="flex flex-col flex-1 min-w-0">
                    <Typography variant="h2" className="text-lg font-bold mb-5">
                        Fechamento de ciclo
                    </Typography>
                    <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: CHART_COLORS.EXCELLENT }}>
                        <Typography
                            variant="caption"
                            className="text-gray-500 max-w-[20rem] leading-5"
                        >
                            Faltam{' '}
                            <span className="font-semibold" style={{ color: CHART_COLORS.EXCELLENT }}>
                                {daysUntilClosure} dias
                            </span>{' '}
                            para o fechamento do ciclo, no dia {closureDate}
                        </Typography>
                    </div>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    <LuCalendarCheck2 className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: CHART_COLORS.EXCELLENT }} />
                    <div className="flex flex-col items-center">
                        <span
                            className="text-4xl sm:text-5xl font-bold"
                            style={{ color: CHART_COLORS.EXCELLENT }}
                        >
                            {daysUntilClosure}
                        </span>
                        <span
                            className="font-bold text-sm sm:text-base"
                            style={{ color: CHART_COLORS.EXCELLENT }}
                        >
                            dias
                        </span>
                    </div>
                </div>
            </CardContainer>
        </div>
    );
}
