// RHMetrics.tsx
import Typography from '../common/Typography';
import CardContainer from '../common/CardContainer';
import { LuFilePen, LuCalendarCheck2 } from 'react-icons/lu';
import { CHART_COLORS } from '../../utils/colorUtils';

interface RHMetricsProps {
    totalCollaborators: number;
    completedEvaluations: number;
    pendingEvaluations: number;
    completionPercentage: number;
    daysUntilClosure?: number;
    closureDate?: string;
}

function ProgressCircle({
    percentage,
    size = 80,
    fontSize = 24,
}: {
    percentage: number;
    size?: number;
    fontSize?: number;
}) {
    const radius = size / 2 - 6;
    const stroke = 6;
    const normalizedRadius = radius;
    const circumference = normalizedRadius * 2 * Math.PI;
    const progress = circumference - (percentage / 100) * circumference;

    return (
        <svg width={size} height={size} className="block">
            <circle
                stroke="#F1F5F9"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={size / 2}
                cy={size / 2}
            />
            <circle
                stroke={CHART_COLORS.GOOD}
                fill="transparent"
                strokeWidth={stroke}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={size / 2}
                cy={size / 2}
                strokeDasharray={circumference}
                strokeDashoffset={progress}
            />
            <text
                x="50%"
                y="54%"
                textAnchor="middle"
                className={`fill-[${CHART_COLORS.GOOD}] font-bold`}
                fontSize={fontSize}
                dy=".3em"
            >
                {percentage}%
            </text>
        </svg>
    );
}

export function RHMetrics({
    pendingEvaluations,
    completionPercentage,
    daysUntilClosure = 30,
    closureDate = '30/08/2025',
}: RHMetricsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Card 1: Preenchimento de avaliação */}
            <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                <div className={`flex flex-col border-l-4 border-[${CHART_COLORS.GOOD}] pl-4 flex-1 min-w-0`}>
                    <Typography variant="h2" className="text-lg font-bold">
                        Preenchimento de avaliação
                    </Typography>
                    <Typography
                        variant="caption"
                        className="text-gray-500 mt-2 flex-1"
                    >
                        <span className={`font-semibold text-[${CHART_COLORS.GOOD}]`}>
                            {completionPercentage}%
                        </span>{' '}
                        dos colaboradores já fecharam suas avaliações
                    </Typography>
                </div>
                <ProgressCircle percentage={completionPercentage} />
            </CardContainer>

            {/* Card 2: Avaliações pendentes */}
            <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                <div className={`flex flex-col border-l-4 border-[${CHART_COLORS.POOR}] pl-4 flex-1 min-w-0`}>
                    <Typography variant="h2" className="text-lg font-bold">
                        Avaliações pendentes
                    </Typography>
                    <Typography
                        variant="caption"
                        className="text-gray-500 mt-2 flex-1"
                    >
                        <span className={`font-semibold text-[${CHART_COLORS.POOR}]`}>
                            {pendingEvaluations}
                        </span>{' '}
                        colaboradores ainda não fecharam sua avaliação
                    </Typography>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                    <LuFilePen className={`text-[${CHART_COLORS.POOR}] w-8 h-8`} />
                    <Typography
                        variant="h1"
                        color="inherit"
                        className={`text-4xl font-bold text-[${CHART_COLORS.POOR}]`}
                    >
                        {pendingEvaluations}
                    </Typography>
                </div>
            </CardContainer>

            {/* Card 3: Fechamento de ciclo */}
            <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                <div className={`flex flex-col border-l-4 border-[${CHART_COLORS.EXCELLENT}] pl-4 flex-1 min-w-0`}>
                    <Typography variant="h2" className="text-lg font-bold">
                        Fechamento de ciclo
                    </Typography>
                    <Typography
                        variant="caption"
                        className="text-gray-500 mt-2 flex-1"
                    >
                        Faltam{' '}
                        <span className={`font-semibold text-[${CHART_COLORS.EXCELLENT}]`}>
                            {daysUntilClosure} dias
                        </span>{' '}
                        para o fechamento do ciclo, no dia {closureDate}
                    </Typography>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                    <LuCalendarCheck2 className={`text-[${CHART_COLORS.EXCELLENT}] w-8 h-8`} />
                    <div className="flex flex-col items-center">
                        <Typography
                            variant="h1"
                            color="inherit"
                            className={`text-4xl font-bold text-[${CHART_COLORS.EXCELLENT}]`}
                        >
                            {daysUntilClosure}
                        </Typography>
                        <Typography
                            variant="caption"
                            color="inherit"
                            className={`text-[${CHART_COLORS.EXCELLENT}] font-bold`}
                        >
                            dias
                        </Typography>
                    </div>
                </div>
            </CardContainer>
        </div>
    );
}
