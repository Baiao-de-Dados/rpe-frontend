import { TiStarburst } from 'react-icons/ti';

interface CycleCardProps {
    score: number;
    status: 'Finalizado' | 'Em andamento' | 'Pendente';
    cycleName: string;
    summary: string;
}

export function CycleCard({
    score,
    status,
    cycleName,
    summary,
}: CycleCardProps) {
    const getScoreColor = () => {
        if (status === 'Em andamento') return 'bg-gray-300 text-gray-600'; // Fundo cinza para ciclos em andamento
        if (score >= 4.5) return 'bg-green-50 text-green-600';
        if (score >= 3.5) return 'bg-yellow-50 text-yellow-600';
        if (score >= 2.5) return 'bg-orange-50 text-orange-600';
        return 'bg-red-50 text-red-600';
    };

    const getStatusColor = () => {
        switch (status) {
            case 'Finalizado':
                return 'bg-green-100 text-green-600';
            case 'Em andamento':
                return 'bg-yellow-100 text-yellow-600';
            case 'Pendente':
                return 'bg-gray-100 text-gray-600';
            default:
                return '';
        }
    };

    return (
        <div className="relative flex items-center p-4 bg-white rounded-lg shadow-md border">
            <span
                className={`absolute top-3.5 right-2 px-2 py-1 text-xs font-semibold rounded ${getStatusColor()}`}
            >
                {status}
            </span>
            <div
                className={`flex flex-col items-center justify-center w-20 h-20 rounded-lg mr-4 ${getScoreColor()}`}
            >
                <p className="text-3xl font-bold">
                    {status === 'Em andamento' ? '-' : score}
                </p>
                <p className="text-sm">
                    {status === 'Em andamento'
                        ? ''
                        : score >= 4.5
                          ? 'Excelente'
                          : score >= 3.5
                            ? 'Bom'
                            : score >= 2.5
                              ? 'Regular'
                              : 'Ruim'}
                </p>
            </div>
            <div className="flex-1 flex flex-col justify-between">
                <p className="text-lg font-bold">{cycleName}</p>
                <div className="mt-2 bg-gray-50 p-4 rounded-lg border-l-4 border-teal-600">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="text-teal-600 text-lg">
                            <TiStarburst />
                        </span>
                        <p className="text-sm font-semibold text-gray-700">
                            Resumo
                        </p>
                    </div>
                    <p className="text-sm text-gray-500">{summary}</p>
                </div>
            </div>
        </div>
    );
}
