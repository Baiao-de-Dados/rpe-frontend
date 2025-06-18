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
    const data = {
        labels: cycles.map(cycle => cycle.cycleName),
        datasets: [
            {
                label: 'Desempenho',
                data: cycles.map(cycle => cycle.score),
                backgroundColor: cycles.map(cycle =>
                    cycle.score >= 4.5
                        ? 'rgba(34, 197, 94, 0.7)'
                        : cycle.score >= 3.5
                          ? 'rgba(234, 179, 8, 0.7)'
                          : cycle.score >= 2.5
                            ? 'rgba(249, 115, 22, 0.7)'
                            : 'rgba(239, 68, 68, 0.7)',
                ),
                borderColor: cycles.map(cycle =>
                    cycle.score >= 4.5
                        ? 'rgba(34, 197, 94, 1)'
                        : cycle.score >= 3.5
                          ? 'rgba(234, 179, 8, 1)'
                          : cycle.score >= 2.5
                            ? 'rgba(249, 115, 22, 1)'
                            : 'rgba(239, 68, 68, 1)',
                ),
                borderWidth: 1,
                borderRadius: 5, // Adiciona bordas arredondadas
                barThickness: 20, // Define a largura das barras
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

    return <Bar data={data} options={options} />;
}
