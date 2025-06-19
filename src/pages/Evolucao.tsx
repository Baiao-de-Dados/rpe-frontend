import Typography from '../components/Typography';
import { PerformanceChart } from '../components/PerformanceChart';
import { LuNotebookPen } from 'react-icons/lu';
import { mockCycles } from '../data/mockCycles';
import { FaStar, FaArrowUp } from 'react-icons/fa';
import CardContainer from '../components/CardContainer';
import CollCycleCard from '../components/CollCycleCard';

export function Evolucao() {
    const sortedCycles = mockCycles
        .slice()
        .sort((a, b) => b.cycleName.localeCompare(a.cycleName)); // Ordena os ciclos em ordem decrescente
    const lastCycle = sortedCycles[0]; // Último ciclo registrado
    const previousFinalizedCycle = sortedCycles.find(
        cycle => cycle.status === 'Finalizado',
    ); // Último ciclo finalizado

    const displayedScore =
        lastCycle?.score > 0
            ? lastCycle.score
            : previousFinalizedCycle?.score || '-'; // Exibe a nota do último ciclo finalizado se o atual não estiver finalizado
    const displayedCycleName =
        lastCycle?.score > 0
            ? lastCycle.cycleName
            : previousFinalizedCycle?.cycleName || 'N/A'; // Exibe o nome do ciclo correspondente

    const previousCycleIndex =
        sortedCycles.findIndex(
            cycle => cycle.cycleName === displayedCycleName,
        ) + 1; // Índice do ciclo anterior
    const previousCycle = sortedCycles[previousCycleIndex]; // Ciclo anterior à nota atual

    const growth =
        lastCycle && previousCycle
            ? (Number(displayedScore) - previousCycle.score).toFixed(1)
            : '0.0'; // Calcula o crescimento
    const finalizedCyclesCount = mockCycles.filter(
        cycle => cycle.status === 'Finalizado',
    ).length; // Conta ciclos finalizados

    return (
        <>
            <header
                className="p-8 bg-white pt-12 pb-12 flex items-center justify-between"
                style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}
            >
                <Typography variant="h1" className="text-4xl font-bold">
                    Evolução
                </Typography>
                <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600">
                    <option value="all">Todos os ciclos</option>
                    {sortedCycles.map(cycle => (
                        <option key={cycle.cycleName} value={cycle.cycleName}>
                            {cycle.cycleName}
                        </option>
                    ))}
                </select>
            </header>
            <main className="p-8 pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Nota atual */}
                    <CardContainer className="flex items-center justify-between">
                        <div className="flex flex-col border-l-4 border-green-600 pl-4">
                            <Typography
                                variant="h2"
                                className="text-lg font-bold"
                            >
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
                            <Typography
                                variant="h2"
                                className="text-lg font-bold"
                            >
                                Crescimento
                            </Typography>
                            <Typography
                                variant="caption"
                                className="text-gray-500 mt-2"
                            >
                                Em comparação ao ciclo{' '}
                                {previousCycle?.cycleName || 'N/A'}
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
                    <CardContainer className="flex items-center justify-between">
                        <div className="flex flex-col border-l-4 border-teal-600 pl-4">
                            <Typography
                                variant="h2"
                                className="text-lg font-bold"
                            >
                                Avaliações realizadas
                            </Typography>
                            <Typography
                                variant="caption"
                                className="text-gray-500 mt-2"
                            >
                                Total de avaliações
                            </Typography>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-teal-600 text-3xl">
                                <LuNotebookPen />
                            </span>
                            <Typography
                                variant="h1"
                                className="text-4xl font-bold text-teal-600"
                            >
                                {finalizedCyclesCount}
                            </Typography>
                        </div>
                    </CardContainer>
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

                {/* Painel de Ciclos de Avaliação */}
                <CardContainer>
                    <Typography
                        variant="h2"
                        className="text-lg font-bold mb-4 "
                    >
                        Ciclos de Avaliação
                    </Typography>
                    <div className="space-y-6">
                        {sortedCycles.map(cycle => (
                            <CollCycleCard
                                key={cycle.cycleName}
                                cycleName={cycle.cycleName}
                                status={
                                    cycle.status as
                                        | 'Finalizado'
                                        | 'Em andamento'
                                        | 'Pendente'
                                }
                                finalScore={cycle.score}
                                selfEvalScore={cycle.score}
                                executionScore={4.0}
                                postureScore={4.5}
                                summary={cycle.summary}
                                onClick={() => {
                                    /* navigate to cycle details if needed */
                                }}
                            />
                        ))}
                    </div>
                </CardContainer>
            </main>
        </>
    );
}
