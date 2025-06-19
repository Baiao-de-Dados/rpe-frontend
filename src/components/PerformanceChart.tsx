import { useState } from 'react';
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

export function PerformanceChart({ cycles }: PerformanceChartProps) {
    const [filter, setFilter] = useState('all');

    const filteredCycles =
        filter === 'all'
            ? cycles
            : cycles.filter(cycle => cycle.cycleName === filter);

    const data = {
        labels: filteredCycles.map(cycle => cycle.cycleName),
        datasets: [
            {
                label: 'Desempenho',
                data: filteredCycles.map(cycle => cycle.score),
                backgroundColor: filteredCycles.map(cycle =>
                    cycle.score >= 4.5
                        ? 'rgba(34, 197, 94, 0.7)'
                        : cycle.score >= 3.5
                          ? 'rgba(234, 179, 8, 0.7)'
                          : cycle.score >= 2.5
                            ? 'rgba(249, 115, 22, 0.7)'
                            : 'rgba(239, 68, 68, 0.7)',
                ),
                borderColor: filteredCycles.map(cycle =>
                    cycle.score >= 4.5
                        ? 'rgba(34, 197, 94, 1)'
                        : cycle.score >= 3.5
                          ? 'rgba(234, 179, 8, 1)'
                          : cycle.score >= 2.5
                            ? 'rgba(249, 115, 22, 1)'
                            : 'rgba(239, 68, 68, 1)',
                ),
                borderWidth: 1,
                borderRadius: 5, // Bordas arredondadas
                barThickness: 30, // Aumenta a largura das barras
            },
        ],
    };

    const options = {
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
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 5,
            },
        },
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <select
                    className="border border-gray-300 cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-600"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                >
                    <option value="all">Todos os ciclos</option>
                    {cycles.map(cycle => (
                        <option key={cycle.cycleName} value={cycle.cycleName}>
                            {cycle.cycleName}
                        </option>
                    ))}
                </select>
            </div>
            <Bar data={data} options={options} />
        </div>
    );
}
