import { useState, useRef, useEffect } from 'react';
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
import { getScoreColor } from '../../utils/colorUtils';

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
    const [isMobile, setIsMobile] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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

    // Usando a função centralizada de cores baseada em score
    const getBarColor = (score: number) => {
        return getScoreColor(score);
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
                // Barras responsivas - menores no mobile
                barThickness: isMobile ? ('flex' as const) : 100,
                maxBarThickness: isMobile ? 50 : 120,
                minBarLength: 2,
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
                        size: isMobile ? 10 : 12,
                    },
                    color: '#555',
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
                        size: isMobile ? 10 : 12,
                    },
                    color: '#444',
                    maxRotation: isMobile ? 45 : 0,
                    minRotation: isMobile ? 45 : 0,
                },
            },
        },
        layout: {
            padding: {
                left: 0,
                right: isMobile ? 5 : 10,
                top: isMobile ? 5 : 10,
                bottom: isMobile ? 5 : 0,
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
            {/* Botão de filtro - posicionamento responsivo */}
            <div
                className={`${isMobile ? 'relative mb-4' : 'absolute top-[-60px] right-0'} z-50`}
            >
                <div className="relative z-50">
                    <button
                        className={`flex items-center space-x-2 text-sm text-neutral-500 border border-neutral-300 rounded-md px-3 py-1.5 ${isMobile ? 'w-full justify-between' : ''}`}
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
                        <div
                            className={`${isMobile ? 'absolute left-0 right-0' : 'absolute right-0'} mt-2 ${isMobile ? 'w-full' : 'w-64'} bg-white shadow-lg rounded-md py-2 z-50 border border-gray-200`}
                        >
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
                                    className="flex flex-col space-y-2"
                                >
                                    <div className="flex items-center justify-center">
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
                                        <span className="text-sm ml-2">
                                            ciclos
                                        </span>
                                    </div>
                                    <button
                                        type="submit"
                                        className="text-xs bg-primary-500 text-white px-3 py-1 rounded hover:bg-primary-600 w-full"
                                    >
                                        Aplicar
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Container do gráfico */}
            <div
                className={`flex items-center justify-center relative z-10 ${isMobile ? 'h-[300px]' : 'h-[450px]'}`}
            >
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}
