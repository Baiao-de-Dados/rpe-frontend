import React from 'react';
import Typography from './Typography';
import CardContainer from './CardContainer';
import SummaryBox from './SummaryBox';
import Badge from './Badge';
import { Sparkles } from 'lucide-react';

interface CollCycleCardProps {
    cycleName: string;
    status: 'Finalizado' | 'Em andamento' | 'Pendente';
    finalScore: number;
    selfEvalScore?: number;
    executionScore?: number;
    postureScore?: number;
    summary?: string;
    onClick?: () => void;
}

const CollCycleCard: React.FC<CollCycleCardProps> = ({
    cycleName,
    status,
    finalScore,
    selfEvalScore = 0,
    executionScore = 0,
    postureScore = 0,
    summary = '',
    onClick,
}) => {
    // Helper function to get color based on score
    const getScoreColor = (score: number) => {
        if (score >= 4.5) return 'bg-green-600';
        if (score >= 3.5) return 'bg-teal-600';
        if (score >= 2.5) return 'bg-yellow-600';
        if (score >= 1.5) return 'bg-orange-600';
        return 'bg-red-600';
    };

    // Helper function to get text color based on score
    const getTextScoreColor = (score: number) => {
        if (score >= 4.5) return 'text-green-600';
        if (score >= 3.5) return 'text-teal-600';
        if (score >= 2.5) return 'text-yellow-600';
        if (score >= 1.5) return 'text-orange-600';
        return 'text-red-600';
    };

    return (
        <CardContainer className="hover:shadow-md transition-shadow border border-gray-200">
            <div className={onClick ? 'cursor-pointer' : ''} onClick={onClick}>
                <div className="mb-4">
                    {/* Layout responsivo: coluna no mobile, linha no desktop */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center flex-wrap gap-2">
                            <Typography variant="h3" className="font-bold">
                                Ciclo {cycleName}
                            </Typography>
                            <Badge
                                label={status}
                                size="sm"
                                variant={
                                    status === 'Finalizado'
                                        ? 'success'
                                        : status === 'Em andamento'
                                          ? 'warning'
                                          : 'info'
                                }
                            />
                        </div>

                        {/* Nota final fica embaixo no mobile */}
                        <div className="flex items-center space-x-2">
                            <Typography
                                variant="caption"
                                className="text-gray-500"
                            >
                                Nota final
                            </Typography>
                            <span
                                className={`px-3 py-1 text-sm font-bold rounded text-white ${getScoreColor(finalScore)}`}
                            >
                                {finalScore > 0 ? finalScore.toFixed(1) : '-'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Autoavaliação */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <Typography
                                variant="caption"
                                className="text-gray-500 text-xs sm:text-sm"
                            >
                                Autoavaliação
                            </Typography>
                            <Typography
                                variant="caption"
                                className={`${getTextScoreColor(selfEvalScore)} font-bold text-sm`}
                            >
                                {selfEvalScore.toFixed(1)}
                            </Typography>
                        </div>
                        <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full">
                            <div
                                className={`h-3 sm:h-4 rounded-full ${getScoreColor(selfEvalScore)}`}
                                style={{
                                    width: `${selfEvalScore * 20}%`, // 5 is max score, so 5*20 = 100%
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* Avaliação final - Execução */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <Typography
                                variant="caption"
                                className="text-gray-500 text-xs sm:text-sm"
                            >
                                Avaliação final - Execução
                            </Typography>
                            <Typography
                                variant="caption"
                                className={`${getTextScoreColor(executionScore)} font-bold text-sm`}
                            >
                                {executionScore.toFixed(1)}
                            </Typography>
                        </div>
                        <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full">
                            <div
                                className={`h-3 sm:h-4 rounded-full ${getScoreColor(executionScore)}`}
                                style={{
                                    width: `${executionScore * 20}%`,
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* Avaliação final - Postura */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <Typography
                                variant="caption"
                                className="text-gray-500 text-xs sm:text-sm"
                            >
                                Avaliação final - Postura
                            </Typography>
                            <Typography
                                variant="caption"
                                className={`${getTextScoreColor(postureScore)} font-bold text-sm`}
                            >
                                {postureScore.toFixed(1)}
                            </Typography>
                        </div>
                        <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full">
                            <div
                                className={`h-3 sm:h-4 rounded-full ${getScoreColor(postureScore)}`}
                                style={{
                                    width: `${postureScore * 20}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Summary section */}
                <div className="mt-4">
                    <SummaryBox
                        summary={
                            status === 'Finalizado'
                                ? summary ||
                                  'Você se saiu muito bem por conta disso e isso.'
                                : '-'
                        }
                        icon={
                            <Sparkles className="text-primary-500" size={18} />
                        }
                        title="Resumo"
                    />
                </div>
            </div>
        </CardContainer>
    );
};

export default CollCycleCard;
