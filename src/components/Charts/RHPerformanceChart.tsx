import { useState, useEffect, useRef } from 'react';
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

interface TrackData {
    track: string;
    completed: number;
    total: number;
}

interface RHPerformanceChartProps {
    data: TrackData[];
}

export function RHPerformanceChart({ data }: RHPerformanceChartProps) {
    const [selectedTrack, setSelectedTrack] = useState<string>('Todas');
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Fechar dropdown ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
            }
        }
        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [showDropdown]);

    // Obter trilhas únicas
    const uniqueTracks = Array.from(new Set(data.map(item => item.track)));

    // Filtrar dados pela trilha selecionada
    const filteredData =
        selectedTrack === 'Todas'
            ? data
            : data.filter(item => item.track === selectedTrack);

    // Cor baseada na porcentagem
    const getBarColor = (completed: number, total: number) => {
        const percentage = (completed / total) * 100;
        if (percentage >= 90) return '#22C55E'; // Verde
        if (percentage >= 70) return '#3B82F6'; // Azul
        if (percentage >= 50) return '#F59E0B'; // Amarelo
        return '#EF4444'; // Vermelho
    };

    const dataChart = {
        labels: filteredData.map(item => item.track),
        datasets: [
            {
                label: 'Avaliações Preenchidas',
                data: filteredData.map(item => item.completed),
                backgroundColor: filteredData.map(item =>
                    getBarColor(item.completed, item.total),
                ),
                borderWidth: 0,
                borderRadius: 6,
                barThickness: isMobile ? ('flex' as const) : 100,
                maxBarThickness: isMobile ? 50 : 120,
                minBarLength: 2,
            },
        ],
    };

    const maxValue = Math.max(...filteredData.map(item => item.total), 0);

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<'bar'>) => {
                        const item = filteredData[context.dataIndex];
                        const percentage = (
                            (item.completed / item.total) *
                            100
                        ).toFixed(1);
                        return [
                            `Preenchidas: ${item.completed}`,
                            `Total: ${item.total}`,
                            `Porcentagem: ${percentage}%`,
                        ];
                    },
                },
                backgroundColor: '#333',
                padding: 10,
                cornerRadius: 4,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: maxValue + 10,
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

    return (
        <div className="w-full h-full relative">
            {/* Dropdown de trilhas */}
            <div
                className={`${isMobile ? 'mb-4' : 'absolute top-[-60px] right-0'}`}
                ref={dropdownRef}
            >
                <button
                    className="flex items-center space-x-2 text-sm text-neutral-500 border border-neutral-300 rounded-md px-3 py-1.5 bg-white"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <span>
                        {selectedTrack === 'Todas'
                            ? 'Todas as Trilhas'
                            : selectedTrack}
                    </span>
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
                {showDropdown && (
                    <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10 border border-neutral-200">
                        <button
                            className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedTrack === 'Todas' ? 'text-primary-600 font-medium' : ''}`}
                            onClick={() => {
                                setSelectedTrack('Todas');
                                setShowDropdown(false);
                            }}
                        >
                            Todas as Trilhas
                        </button>
                        {uniqueTracks.map(track => (
                            <button
                                key={track}
                                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedTrack === track ? 'text-primary-600 font-medium' : ''}`}
                                onClick={() => {
                                    setSelectedTrack(track);
                                    setShowDropdown(false);
                                }}
                            >
                                {track}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {/* Container do gráfico */}
            <div
                className={`flex items-center justify-center ${isMobile ? 'h-[300px]' : 'h-[450px]'}`}
            >
                <Bar data={dataChart} options={options} />
            </div>
        </div>
    );
}
