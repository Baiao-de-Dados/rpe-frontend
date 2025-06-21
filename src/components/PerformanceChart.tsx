import { useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import type { TooltipItem } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

interface PerformanceChartProps {
    cycles: { cycleName: string; score: number }[];
}

type FilterOption = 'last3' | 'lastN' | 'all';

export function PerformanceChart({ cycles }: PerformanceChartProps) {
    const [filter, setFilter] = useState<FilterOption>('last3');
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [customNumber, setCustomNumber] = useState<number>(3);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFilterChange = (newFilter: FilterOption) => {
        setFilter(newFilter);
        setShowFilterMenu(false);
    };

    const handleCustomNumberSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const value = parseInt(inputRef.current?.value || '3', 10);
        setCustomNumber(Math.max(1, Math.min(value, cycles.length))); // Ensure it's between 1 and cycles.length
        setFilter('lastN');
        setShowFilterMenu(false);
    };

    // Sort cycles by cycleName (assuming they're in format like "2024.1")
    const sortedCycles = [...cycles].sort((a, b) => {
        return b.cycleName.localeCompare(a.cycleName); // Descending order (newest first)
    });

    // Apply the selected filter
    const filteredCycles = (() => {
        switch (filter) {
            case 'last3':
                return sortedCycles.slice(0, 3);
            case 'lastN':
                return sortedCycles.slice(0, customNumber);
            case 'all':
            default:
                return sortedCycles;
        }
    })();

    // Cores baseadas na pontuação
    const getBarColor = (score: number) => {
        if (score >= 4.5) return '#5CB85C'; // Verde (ótimo)
        if (score >= 3.5) return '#09A6A6'; // Verde azulado (bom)
        if (score >= 2.5) return '#F0AD4E'; // Amarelo (regular)
        if (score >= 1.5) return '#FF9800'; // Laranja (baixo)
        return '#D9534F'; // Vermelho (crítico)
    };

    // Limitando aos ciclos filtrados
    const displayCycles = filteredCycles;

    const data = {
        labels: displayCycles.map(cycle => cycle.cycleName),
        datasets: [
            {
                label: 'Desempenho',
                data: displayCycles.map(cycle => cycle.score),
                backgroundColor: displayCycles.map(cycle =>
                    getBarColor(cycle.score),
                ),
                borderWidth: 0,
                borderRadius: 6,
                // Barras com tamanho adequado para o gráfico
                barThickness: 100,
                maxBarThickness: 120,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<'bar'>) =>
                        `Nota: ${context.raw}`,
                },
                backgroundColor: '#333',
                padding: 10,
                cornerRadius: 4,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 5,
                ticks: {
                    stepSize: 1,
                    font: {
                        size: 12,
                    },
                    color: '#555', // Cor mais escura para melhor leitura
                },
                grid: {
                    color: '#e0e0e0',
                    drawBorder: true,
                    borderColor: '#aaa',
                    lineWidth: 1,
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                    color: '#444',
                },
            },
        },
        layout: {
            padding: {
                left: 0,
                right: 10,
                top: 10,
                bottom: 0,
            },
        },
    };

    // Obtém texto para exibir no botão de filtro
    const getFilterButtonText = () => {
        switch (filter) {
            case 'last3':
                return 'Últimos 3 Ciclos';
            case 'lastN':
                return `Últimos ${customNumber} Ciclos`;
            case 'all':
                return 'Todos os Ciclos';
            default:
                return 'Filtrar por';
        }
    };

    return (
        <div className="w-full h-full relative">
            {/* Posicionar o filtro no canto superior direito */}
            <div className="absolute top-[-60px] right-0">
                <div className="relative">
                    <button
                        className="flex items-center space-x-2 text-sm text-neutral-500 border border-neutral-300 rounded-md px-3 py-1.5"
                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                    >
                        <span>{getFilterButtonText()}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {showFilterMenu && (
                        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md py-2 z-10">
                            <button
                                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${filter === 'last3' ? 'text-primary-600 font-medium' : ''}`}
                                onClick={() => handleFilterChange('last3')}
                            >
                                Últimos 3 Ciclos
                            </button>
                            <button
                                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${filter === 'all' ? 'text-primary-600 font-medium' : ''}`}
                                onClick={() => handleFilterChange('all')}
                            >
                                Todos os Ciclos
                            </button>
                            <div className="px-4 py-2 border-t border-gray-100">
                                <form
                                    onSubmit={handleCustomNumberSubmit}
                                    className="flex items-center"
                                >
                                    <span className="text-sm mr-2">
                                        Últimos
                                    </span>
                                    <input
                                        ref={inputRef}
                                        type="number"
                                        min="1"
                                        max={cycles.length}
                                        defaultValue={customNumber}
                                        className="w-16 p-1 border border-gray-300 rounded text-sm"
                                    />
                                    <span className="text-sm mx-2">ciclos</span>
                                    <button
                                        type="submit"
                                        className="ml-auto text-xs bg-primary-500 text-white px-2 py-1 rounded hover:bg-primary-600"
                                    >
                                        Aplicar
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Chart container - removed unnecessary margin-top since filter is absolute positioned */}
            <div className="flex items-center justify-center h-[450px]">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}
