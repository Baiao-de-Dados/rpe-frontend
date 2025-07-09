// src/components/Dashboard/ManagerMetrics.tsx
import React from 'react';
import Typography from '../common/Typography';
import CardContainer from '../common/CardContainer';
import { LuUsers, LuClipboardCheck } from 'react-icons/lu';
import { CHART_COLORS } from '../../utils/colorUtils';

interface ManagerMetricsProps {
    cycleStatus: 'open' | 'closed';
    // Para ambos os status
    totalLeaders?: number;
    totalCollaborators?: number;
    completionPercentage?: number;
    // Para ciclo aberto
    collaboratorsNotFinished?: number;
    // Para ciclo fechado
    leadersCompleted?: number;
    collaboratorsNotCompleted?: number;
    pendingReviews?: number;
}

interface ProgressCircleProps {
    percentage: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ percentage }) => {
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-24 h-24 sm:w-28 sm:h-28">
            <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
            >
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                    fill="none"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke={CHART_COLORS.GOOD}
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-in-out"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold" style={{ color: CHART_COLORS.GOOD }}>
                    {percentage}%
                </span>
            </div>
        </div>
    );
};

export function ManagerMetrics({
    cycleStatus,
    totalLeaders = 0,
    completionPercentage = 0,
    collaboratorsNotFinished = 0,
    leadersCompleted = 0,
    collaboratorsNotCompleted = 0,
    pendingReviews = 0,
}: ManagerMetricsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Card 1: Líderes */}
            <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                <div className="flex flex-col flex-1 min-w-0">
                    <Typography variant="h2" className="text-xl font-bold mb-5">
                        {cycleStatus === 'open' ? 'Meus líderes' : 'Avaliações dos líderes'}
                    </Typography>
                    <div className="flex items-center border-l-4 pl-4 min-h-[4rem]" style={{ borderLeftColor: CHART_COLORS.EXCELLENT }}>
                        <Typography
                            variant="caption"
                            className="max-w-[20rem] leading-5"
                        >
                            {cycleStatus === 'open' ? (
                                <>Você tem <span className="font-semibold" style={{ color: CHART_COLORS.EXCELLENT }}>{totalLeaders}</span> líderes sob sua gestão</>
                            ) : (
                                <><span className="font-semibold" style={{ color: CHART_COLORS.EXCELLENT }}>{leadersCompleted}</span> de {totalLeaders} líderes concluíram suas avaliações</>
                            )}
                        </Typography>
                    </div>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                    <LuUsers className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: CHART_COLORS.EXCELLENT }} />
                    <div className="flex flex-col items-center">
                        <span
                            className="text-4xl sm:text-5xl font-bold"
                            style={{ color: CHART_COLORS.EXCELLENT }}
                        >
                            {cycleStatus === 'open' ? totalLeaders : leadersCompleted}
                        </span>
                        <span
                            className="font-bold text-sm sm:text-base"
                            style={{ color: CHART_COLORS.EXCELLENT }}
                        >
                        </span>
                    </div>
                </div>
            </CardContainer>

            {/* Card 2: Colaboradores */}
            {cycleStatus === 'open' ? (
                <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                    <div className="flex flex-col flex-1 min-w-0">
                        <Typography variant="h2" className="text-lg font-bold mb-5">
                            Preenchimento das avaliações
                        </Typography>
                        <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: CHART_COLORS.GOOD }}>
                            <Typography
                                variant="caption"
                                className="max-w-[20rem] leading-5"
                            >
                                <span className="font-semibold" style={{ color: CHART_COLORS.GOOD }}>
                                    {completionPercentage}%
                                </span>{' '}
                                dos seus colaboradores já concluiram suas avaliações
                            </Typography>
                        </div>
                    </div>
                    <ProgressCircle percentage={completionPercentage} />
                </CardContainer>
            ) : (
                <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                    <div className="flex flex-col flex-1 min-w-0">
                        <Typography variant="h2" className="text-lg font-bold mb-5">
                            Avaliações pendentes
                        </Typography>
                        <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: '#dc2626' }}>
                            <Typography
                                variant="caption"
                                className="max-w-[20rem] leading-5"
                            >
                                Colaboradores não finalizaram o formulário de avaliação
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                        <LuClipboardCheck className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: '#dc2626' }} />
                        <span className="text-4xl sm:text-5xl font-bold" style={{ color: '#dc2626' }}>
                            {collaboratorsNotCompleted}
                        </span>
                    </div>
                </CardContainer>
            )}

            {/* Card 3: Ações pendentes */}
            {cycleStatus === 'open' ? (
                <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
                    <div className="flex flex-col flex-1 min-w-0">
                        <Typography variant="h2" className="text-lg font-bold mb-5">
                            Avaliações não concluidas
                        </Typography>
                        <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: '#dc2626' }}>
                            <Typography
                                variant="caption"
                                className="max-w-[20rem] leading-5"
                            >
                                Colaboradores que ainda não enviaram suas avaliações
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                        <LuClipboardCheck className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: '#dc2626' }} />
                        <span className="text-4xl sm:text-5xl font-bold" style={{ color: '#dc2626' }}>
                            {collaboratorsNotFinished}
                        </span>
                    </div>
                </CardContainer>
            ) : (
                <CardContainer className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 sm:p-8 gap-4 bg-[#167174]">
                    <div className="flex flex-col flex-1 min-w-0">
                        <Typography variant="h2" className="text-lg font-bold text-white mb-5">
                            Revisões pendentes
                        </Typography>
                        <div className="flex items-center border-l-4 pl-4 min-h-[3rem]" style={{ borderLeftColor: 'white' }}>
                            <Typography
                                variant="caption"
                                className="text-white/80 max-w-[20rem] leading-5"
                            >
                                Conlcua suas revisões pendentes para o ciclo atual
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                        <LuUsers className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        <span className="text-4xl sm:text-5xl font-bold text-white">
                            {pendingReviews}
                        </span>
                    </div>
                </CardContainer>
            )}
        </div>
    );
}
