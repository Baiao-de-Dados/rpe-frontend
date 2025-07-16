import React from 'react';
import Typography from './Typography';
import CardContainer from './CardContainer';
import SummaryBox from './SummaryBox';
import Badge from './Badge';
import { getScoreBgStyles, getScoreStyles } from '../../utils/colorUtils';

interface CollCycleCardProps {
    cycleName: string;
    status: 'Finalizado' | 'Em andamento';
    finalScore: number;
    selfEvalScore?: number;
    managerScore?: number;
    summary?: string;
    onClick?: () => void;
}

const CollCycleCard: React.FC<CollCycleCardProps> = ({
    cycleName,
    status,
    selfEvalScore = 0,
    managerScore = 0,
    finalScore = 0,
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
                                className="px-3 py-1 text-sm font-bold rounded text-white"
                                style={getScoreBgStyles(finalScore)}
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
                            <span
                                className="font-bold text-sm"
                                style={getScoreStyles(selfEvalScore)}
                            >
                                {selfEvalScore.toFixed(1)}
                            </span>
                        </div>
                        <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full">
                            <div
                                className="h-3 sm:h-4 rounded-full"
                                style={{
                                    width: `${selfEvalScore * 20}%`,
                                    ...getScoreBgStyles(selfEvalScore)
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
                                Avaliação gestor
                            </Typography>
                            <span
                                className="font-bold text-sm"
                                style={getScoreStyles(managerScore)}
                            >
                                {managerScore.toFixed(1)}
                            </span>
                        </div>
                        <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full">
                            <div
                                className="h-3 sm:h-4 rounded-full"
                                style={{
                                    width: `${managerScore * 20}%`,
                                    ...getScoreBgStyles(managerScore)
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
                                Avaliação final
                            </Typography>
                            <span
                                className="font-bold text-sm"
                                style={getScoreStyles(finalScore)}
                            >
                                {finalScore.toFixed(1)}
                            </span>
                        </div>
                        <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full">
                            <div
                                className="h-3 sm:h-4 rounded-full"
                                style={{
                                    width: `${finalScore * 20}%`,
                                    ...getScoreBgStyles(finalScore)
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
