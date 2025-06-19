import Typography from '../components/Typography';
import { PerformanceChart } from '../components/PerformanceChart';
import { LuNotebookPen } from 'react-icons/lu';
import { mockCycles } from '../data/mockCycles';
import { FaStar, FaArrowUp } from 'react-icons/fa';
import { TiStarburst } from 'react-icons/ti';

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
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
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
                    </div>

                    {/* Crescimento */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
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
                    </div>

                    {/* Avaliações realizadas */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
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
                    </div>
                </div>

                {/* Gráfico de desempenho */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <Typography variant="h2" className="text-lg font-bold mb-4">
                        Desempenho
                    </Typography>
                    <PerformanceChart cycles={sortedCycles} />
                </div>

                {/* Painel de Ciclos de Avaliação */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <Typography variant="h2" className="text-lg font-bold mb-4">
                        Ciclos de Avaliação
                    </Typography>
                    <div className="space-y-0">
                        {' '}
                        {/* Alterado de space-y-6 para space-y-0 */}
                        {sortedCycles.map(cycle => (
                            <div
                                key={cycle.cycleName}
                                className="p-4 bg-gray-50 rounded-lg shadow-md"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2">
                                        <Typography
                                            variant="h3"
                                            className="font-bold"
                                        >
                                            {cycle.cycleName}
                                        </Typography>
                                        <span
                                            className={`px-2 py-1 text-xs font-semibold rounded ${
                                                cycle.status === 'Finalizado'
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-yellow-100 text-yellow-600'
                                            }`}
                                        >
                                            {cycle.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Typography
                                            variant="caption"
                                            className="text-gray-500"
                                        >
                                            Nota final
                                        </Typography>
                                        <span
                                            className={`px-3 py-1 text-sm font-bold rounded ${
                                                cycle.score >= 4.5
                                                    ? 'bg-green-600 text-white'
                                                    : cycle.score >= 3.5
                                                      ? 'bg-yellow-600 text-white'
                                                      : cycle.score >= 2.5
                                                        ? 'bg-orange-600 text-white'
                                                        : 'bg-red-600 text-white'
                                            }`}
                                        >
                                            {cycle.score > 0
                                                ? cycle.score.toFixed(1)
                                                : '-'}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                                        <Typography
                                            variant="caption"
                                            className="text-gray-500"
                                        >
                                            Autoavaliação
                                        </Typography>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <div className="w-full h-4 bg-gray-200 rounded-full">
                                                <div
                                                    className={`h-4 rounded-full ${
                                                        cycle.score >= 4.5
                                                            ? 'bg-green-600'
                                                            : cycle.score >= 3.5
                                                              ? 'bg-yellow-600'
                                                              : cycle.score >=
                                                                  2.5
                                                                ? 'bg-orange-600'
                                                                : 'bg-red-600'
                                                    }`}
                                                    style={{
                                                        width: `${cycle.score * 20}%`,
                                                    }}
                                                ></div>
                                            </div>
                                            <Typography
                                                variant="caption"
                                                className={`${
                                                    cycle.score >= 4.5
                                                        ? 'text-green-600'
                                                        : cycle.score >= 3.5
                                                          ? 'text-yellow-600'
                                                          : cycle.score >= 2.5
                                                            ? 'text-orange-600'
                                                            : 'text-red-600'
                                                } font-bold`}
                                            >
                                                {cycle.score.toFixed(1)}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div>
                                        <Typography
                                            variant="caption"
                                            className="text-gray-500"
                                        >
                                            Avaliação final - Execução
                                        </Typography>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <div className="w-full h-4 bg-gray-200 rounded-full">
                                                <div
                                                    className="h-4 rounded-full bg-teal-600"
                                                    style={{ width: '80%' }}
                                                ></div>
                                            </div>
                                            <Typography
                                                variant="caption"
                                                className="text-teal-600 font-bold"
                                            >
                                                4.0
                                            </Typography>
                                        </div>
                                    </div>
                                    <div>
                                        <Typography
                                            variant="caption"
                                            className="text-gray-500"
                                        >
                                            Avaliação final - Postura
                                        </Typography>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <div className="w-full h-4 bg-gray-200 rounded-full">
                                                <div
                                                    className="h-4 rounded-full bg-teal-600"
                                                    style={{ width: '90%' }}
                                                ></div>
                                            </div>
                                            <Typography
                                                variant="caption"
                                                className="text-teal-600 font-bold"
                                            >
                                                4.5
                                            </Typography>
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                                <div className="mt-4 bg-gray-50 p-4 rounded-lg border-l-4 border-teal-600">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-teal-600 text-lg">
                                            <TiStarburst />
                                        </span>
                                        <Typography
                                            variant="caption"
                                            className="text-gray-700 font-semibold"
                                        >
                                            Resumo
                                        </Typography>
                                    </div>
                                    <Typography
                                        variant="body"
                                        className="text-gray-700 mt-2"
                                    >
                                        {cycle.status === 'Finalizado'
                                            ? 'Você se saiu muito bem por conta disso e isso.'
                                            : '-'}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
