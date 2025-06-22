import Typography from '../Typography';
import { PerformanceChart } from '../PerformanceChart';
import { FaStar, FaArrowUp } from 'react-icons/fa';
import CardContainer from '../CardContainer';
import { AvaliacoesRealizadas } from './AvaliacoesRealizadas';

interface Cycle {
    cycleName: string;
    status: 'Finalizado' | 'Em andamento' | 'Pendente' | string;
    score: number;
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
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Nota atual */}
                <CardContainer className="flex items-center justify-between">
                    <div className="flex flex-col border-l-4 border-green-600 pl-4">
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
                        <span
                            className={`text-5xl ${
                                Number(displayedScore) >= 4.5
                                    ? 'text-green-600'
                                    : Number(displayedScore) >= 3.5
                                      ? 'text-yellow-600'
                                      : Number(displayedScore) >= 2.5
                                        ? 'text-orange-600'
                                        : 'text-red-600'
                            }`}
                        >
                            <FaStar />
                        </span>
                        <div className="flex flex-col items-center">
                            <Typography
                                variant="h1"
                                className={`text-4xl font-bold ${
                                    Number(displayedScore) >= 4.5
                                        ? 'text-green-600'
                                        : Number(displayedScore) >= 3.5
                                          ? 'text-yellow-600'
                                          : Number(displayedScore) >= 2.5
                                            ? 'text-orange-600'
                                            : 'text-red-600'
                                }`}
                            >
                                {displayedScore}
                            </Typography>
                            <Typography
                                variant="caption"
                                className={`${
                                    Number(displayedScore) >= 4.5
                                        ? 'text-green-600'
                                        : Number(displayedScore) >= 3.5
                                          ? 'text-yellow-600'
                                          : Number(displayedScore) >= 2.5
                                            ? 'text-orange-600'
                                            : 'text-red-600'
                                }`}
                            >
                                {Number(displayedScore) >= 4.5
                                    ? 'Great'
                                    : Number(displayedScore) >= 3.5
                                      ? 'Good'
                                      : Number(displayedScore) >= 2.5
                                        ? 'Regular'
                                        : 'Poor'}
                            </Typography>
                        </div>
                    </div>
                </CardContainer>

                {/* Crescimento */}
                <CardContainer className="flex items-center justify-between">
                    <div className="flex flex-col border-l-4 border-yellow-600 pl-4">
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
                                parseFloat(growth) > 0
                                    ? 'text-yellow-600'
                                    : parseFloat(growth) === 0
                                      ? 'text-gray-600'
                                      : 'text-red-600'
                            } ${parseFloat(growth) >= 0 ? 'rotate-0' : 'rotate-180'}`}
                        >
                            <FaArrowUp />
                        </span>
                        <Typography
                            variant="h1"
                            className={`text-4xl font-bold ${
                                parseFloat(growth) > 0
                                    ? 'text-yellow-600'
                                    : parseFloat(growth) === 0
                                      ? 'text-gray-600'
                                      : 'text-red-600'
                            }`}
                        >
                            {growth}
                        </Typography>
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
