import Typography from '../common/Typography';
import { PerformanceChart } from '../Charts/PerformanceChart';
import { FaStar, FaArrowUp } from 'react-icons/fa';
import CardContainer from '../common/CardContainer';
import { AvaliacoesRealizadas } from './AvaliacoesRealizadas';
import {
    getScoreColor,
    getScoreLabel,
    CHART_COLORS,
} from '../../utils/colorUtils';

interface Cycle {
    cycleName: string;
    status: 'Finalizado' | 'Em andamento' | 'Pendente' | string;
    finalScore: number;
    selfEvalScore?: number;
    managerScore?: number;
    summary: string;
}

interface EvolucaoDesempenhoProps {
    displayedScore: number | string;
    displayedCycleName: string;
    growth: string;
    previousCycleName: string;
    finalizedCyclesCount: number;
    sortedCycles: Cycle[];
}

export function PerfomanceEvolution({
    displayedScore,
    displayedCycleName,
    growth,
    previousCycleName,
    finalizedCyclesCount,
    sortedCycles,
}: EvolucaoDesempenhoProps) {
    const score = Number(displayedScore);
    const scoreColor = getScoreColor(score);

    const getGrowthColor = (growth: number) => {
        if (growth > 0) return CHART_COLORS.AVERAGE;
        if (growth === 0) return '#6B7280';
        return CHART_COLORS.BELOW;
    };

    const growthValue = parseFloat(growth);
    const growthColor = getGrowthColor(growthValue);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Nota atual */}
                <CardContainer className="flex items-center justify-between">
                    <div
                        className="flex flex-col border-l-4 pl-4"
                        style={{ borderLeftColor: scoreColor }}
                    >
                        <Typography variant="h2" className="text-lg font-bold">
                            Nota atual
                        </Typography>
                        <Typography
                            variant="caption"
                            className="text-gray-500 mt-2"
                        >
                            Nota final do ciclo realizado em{' '}
                            {displayedCycleName}
                        </Typography>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-5xl" style={{ color: scoreColor }}>
                            <FaStar />
                        </span>
                        <div className="flex flex-col items-center">
                            <span
                                className="text-4xl font-bold"
                                style={{ color: scoreColor }}
                            >
                                {displayedScore}
                            </span>
                            <span
                                className="text-sm"
                                style={{ color: scoreColor }}
                            >
                                {getScoreLabel(score)}
                            </span>
                        </div>
                    </div>
                </CardContainer>

                {/* Crescimento */}
                <CardContainer className="flex items-center justify-between">
                    <div
                        className="flex flex-col border-l-4 pl-4"
                        style={{ borderLeftColor: growthColor }}
                    >
                        <Typography variant="h2" className="text-lg font-bold">
                            Crescimento
                        </Typography>
                        <Typography
                            variant="caption"
                            className="text-gray-500 mt-2"
                        >
                            Em comparação ao ciclo {previousCycleName || 'N/A'}
                        </Typography>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span
                            className={`text-4xl ${
                                growthValue >= 0 ? 'rotate-0' : 'rotate-180'
                            }`}
                            style={{ color: growthColor }}
                        >
                            <FaArrowUp />
                        </span>
                        <span
                            className="text-4xl font-bold"
                            style={{ color: growthColor }}
                        >
                            {growth}
                        </span>
                    </div>
                </CardContainer>

                {/* Avaliações realizadas */}
                <AvaliacoesRealizadas
                    finalizedCyclesCount={finalizedCyclesCount}
                />
            </div>

            {/* Gráfico de desempenho */}
            <CardContainer>
                <Typography variant="h2" className="text-lg font-bold mb-4">
                    Desempenho
                </Typography>
                <PerformanceChart
                    cycles={sortedCycles.filter(
                        cycle => cycle.status === 'Finalizado',
                    )}
                />
            </CardContainer>
        </>
    );
}
