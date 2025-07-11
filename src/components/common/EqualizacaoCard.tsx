import React from 'react';
import Typography from './Typography';
import CardContainer from './CardContainer';
import SummaryBox from './SummaryBox';
import Badge from './Badge';
import { getScoreBgStyles, getScoreStyles } from '../../utils/colorUtils';

interface EqualizacaoCardProps {
    collaboratorName: string;
    position: string;
    status: 'Finalizado' | 'Em andamento';
    finalScore: number;
    selfEvalScore?: number;
    managerEvalScore?: number;
    postureScore?: number;
    summary?: string;
    onClick?: () => void;
}

const EqualizacaoCard: React.FC<EqualizacaoCardProps> = ({
    collaboratorName,
    position,
    status,
    finalScore,
    selfEvalScore = 0,
    managerEvalScore = 0,
    postureScore = 0,
    summary = '',
    onClick,
}) => {
    return (
        <CardContainer className="hover:shadow-md transition-shadow border border-gray-200">
            <div className={onClick ? 'cursor-pointer' : ''} onClick={onClick}>
                {/* Colaborador Info */}
                <div className="mb-4">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                            <Typography variant="body" className="text-white font-bold">
                                {collaboratorName.charAt(0).toUpperCase()}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h3" className="font-bold">
                                {collaboratorName}
                            </Typography>
                            <Typography variant="caption" className="text-gray-500">
                                {position}
                            </Typography>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center flex-wrap gap-2">
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

                {/* Avaliações */}
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
                                Avaliação Gestor
                            </Typography>
                            <span
                                className="font-bold text-sm"
                                style={getScoreStyles(managerEvalScore)}
                            >
                                {managerEvalScore.toFixed(1)}
                            </span>
                        </div>
                        <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full">
                            <div
                                className="h-3 sm:h-4 rounded-full"
                                style={{
                                    width: `${managerEvalScore * 20}%`,
                                    ...getScoreBgStyles(managerEvalScore)
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
                                Avaliação 360
                            </Typography>
                            <span
                                className="font-bold text-sm"
                                style={getScoreStyles(postureScore)}
                            >
                                {postureScore.toFixed(1)}
                            </span>
                        </div>
                        <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full">
                            <div
                                className="h-3 sm:h-4 rounded-full"
                                style={{
                                    width: `${postureScore * 20}%`,
                                    ...getScoreBgStyles(postureScore)
                                }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Resumo e Ações */}
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

                {/* Avaliação e Justificativa */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <Typography variant="caption" className="text-gray-500 mb-2 block">
                        Dê uma avaliação de 1 a 5
                    </Typography>
                    <div className="flex items-center space-x-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                className="w-5 h-5 text-gray-300 cursor-pointer hover:text-yellow-500"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        ))}
                    </div>
                    
                    <Typography variant="caption" className="text-gray-500 mb-2 block">
                        Justifique sua nota
                    </Typography>
                    <textarea
                        className="w-full h-20 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Justifique sua nota"
                        readOnly
                    />
                </div>

                {/* Botões */}
                <div className="mt-4 flex justify-end space-x-2">
                    <button className="px-4 py-2 text-sm text-teal-600 border border-teal-600 rounded-md hover:bg-teal-50">
                        Cancelar
                    </button>
                    <button className="px-4 py-2 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700">
                        Editar resultado
                    </button>
                </div>
            </div>
        </CardContainer>
    );
};

export default EqualizacaoCard;
