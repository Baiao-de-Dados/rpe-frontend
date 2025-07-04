import React from 'react';
import Typography from './Typography';
import CardContainer from './CardContainer';
import SummaryBox from './SummaryBox';
import Badge from './Badge';
import { getScoreBgClasses, getScoreTextClasses } from '../../utils/colorUtils';

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
    return (
        <CardContainer className="hover:shadow-md transition-shadow border border-gray-200">
            <div className={onClick ? 'cursor-pointer' : ''} onClick={onClick}>
                <div className="mb-4">
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

                        <div className="flex items-center space-x-2">
                            <Typography
                                variant="caption"
                                className="text-gray-500"
                            >
                                Nota final
                            </Typography>
                            <span
                                className={`px-3 py-1 text-sm font-bold rounded text-white ${getScoreBgClasses(finalScore)}`}
                            >
                                {finalScore > 0 ? finalScore.toFixed(1) : '-'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                className={`${getScoreTextClasses(selfEvalScore)} font-bold text-sm`}
                            >
                                {selfEvalScore.toFixed(1)}
                            </Typography>
                        </div>
                        <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full">
                            <div
                                className={`h-3 sm:h-4 rounded-full ${getScoreBgClasses(selfEvalScore)}`}
                                style={{
                                    width: `${selfEvalScore * 20}%`,
                                }}
                            ></div>
                        </div>
                    </div>

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
                                className={`${getScoreTextClasses(executionScore)} font-bold text-sm`}
                            >
                                {executionScore.toFixed(1)}
                            </Typography>
                        </div>
                        <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full">
                            <div
                                className={`h-3 sm:h-4 rounded-full ${getScoreBgClasses(executionScore)}`}
                                style={{
                                    width: `${executionScore * 20}%`,
                                }}
                            ></div>
                        </div>
                    </div>

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
                                className={`${getScoreTextClasses(postureScore)} font-bold text-sm`}
                            >
                                {postureScore.toFixed(1)}
                            </Typography>
                        </div>
                        <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full">
                            <div
                                className={`h-3 sm:h-4 rounded-full ${getScoreBgClasses(postureScore)}`}
                                style={{
                                    width: `${postureScore * 20}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <SummaryBox
                        summary={
                            status === 'Finalizado'
                                ? summary ||
                                  'Você se saiu muito bem por conta disso e isso.'
                                : '-'
                        }
                    />
                </div>
            </div>
        </CardContainer>
    );
};

export default CollCycleCard;
