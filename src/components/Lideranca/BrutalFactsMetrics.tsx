import CardContainer from '../../components/common/CardContainer';
import Typography from '../../components/common/Typography';
import { CHART_COLORS, getScoreLabel, getScoreColor } from '../../utils/colorUtils';
import { Star, ArrowUp, ArrowDown, Users } from 'lucide-react';

interface BrutalFactMetricsProps {
    score: number;
    cycleLabel: string;
    growth: number;
    growthCycleLabel: string;
    total: number;
    avaliadosDescription?: string;
    rateDescription?: string;
    performanceDescription?: string;
}

export default function BrutalFactMetrics({
    score,
    cycleLabel,
    growth,
    growthCycleLabel,
    total,
    avaliadosDescription,
    performanceDescription,
}: BrutalFactMetricsProps) {

    const isPositive = growth > 0;
    const isNegative = growth < 0;
    const scoreColor = getScoreColor(score);
    const growthColor = getScoreColor(growth);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
            <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                <div className="flex flex-col flex-1 min-w-0">
                    <Typography variant="h2" className="text-lg font-bold mb-5 text-black">
                        Nota média geral
                    </Typography>
                    <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: scoreColor }}>
                        <Typography
                            variant="caption"
                            className="text-gray-500 max-w-[20rem] leading-5"
                        >
                            {
                                <span>Média geral dos seus liderados no ciclo {cycleLabel}.</span>
                            }
                        </Typography>
                    </div>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    <Star className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: scoreColor }} fill={scoreColor} />
                    <div className="flex flex-col items-center">
                        <span
                            className="text-4xl sm:text-5xl font-bold"
                            style={{ color: scoreColor }}
                        >
                            {score.toFixed(2)}
                        </span>
                        <span
                            className="font-bold text-sm sm:text-base"
                            style={{ color: scoreColor }}
                        >
                            {getScoreLabel(score)}
                        </span>
                    </div>
                </div>
            </CardContainer>

            <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                <div className="flex flex-col flex-1 min-w-0">
                    <Typography variant="h2" className="text-lg font-bold mb-5 text-black">
                        Desempenho de liderados
                    </Typography>
                    <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: growthColor }}>
                        <Typography
                            variant="caption"
                            className="text-gray-500 max-w-[20rem] leading-5"
                        >
                            {performanceDescription ? (
                                <span>{performanceDescription}</span>
                            ) : (
                                <span>
                                    Crescimento de{' '}
                            <span className="font-bold" style={{ color: growthColor }}>
                                {isPositive ? `+${growth}` : growth}
                            </span>{' '}
                                    comparação ao ciclo {growthCycleLabel}
                                </span>
                            )}
                        </Typography>
                    </div>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    {isPositive && (
                        <ArrowUp className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: growthColor }} strokeWidth={2.5} />
                    )}
                    {isNegative && (
                        <ArrowDown className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: growthColor }} strokeWidth={2.5} />
                    )}
                    <div className="flex flex-col items-center">
                        <span
                            className="text-4xl sm:text-5xl font-bold"
                            style={{ color: growthColor }}
                        >
                            {isPositive ? `+${growth}` : growth}
                        </span>
                        <span
                            className="font-bold text-sm sm:text-base"
                            style={{ color: growthColor }}
                        >
                        </span>
                    </div>
                </div>
            </CardContainer>
            
            <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                <div className="flex flex-col flex-1 min-w-0">
                    <Typography variant="h2" className="text-lg font-bold mb-5 text-black">
                        Liderados avaliados
                    </Typography>
                    <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: CHART_COLORS.GOOD }}>
                        <Typography
                            variant="caption"
                            className="text-gray-500 max-w-[20rem] leading-5"
                        >
                            {avaliadosDescription ? (
                                <span>{avaliadosDescription}</span>
                            ) : (
                                <span>
                                    Foram avaliados{' '}
                                    <span className="font-bold" style={{ color: CHART_COLORS.GOOD }}>{total} colaboradores</span>{' '}
                                    liderados por você
                                </span>
                            )}
                        </Typography>
                    </div>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    <Users className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: CHART_COLORS.GOOD }} />
                    <div className="flex flex-col items-center">
                        <span
                            className="text-4xl sm:text-5xl font-bold"
                            style={{ color: CHART_COLORS.GOOD }}
                        >
                            {total}
                        </span>
                    </div>
                </div>
            </CardContainer>
        </div>
    );
}