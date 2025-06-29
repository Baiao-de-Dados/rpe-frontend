import React from 'react';
import CollaboratorCard from './CollaboratorCard';
import Badge, { type BadgeVariant } from './Badge';
import Typography from './Typography';

export interface EvaluationField {
    label: string;
    value?: string | number;
    bold?: boolean;
}

export interface CollaboratorEvaluationCardProps {
    collaborator: {
        nome: string;
        cargo: string;
        image?: string;
        avatar?: string;
        status: string;
        statusVariant?: BadgeVariant;
    };
    evaluationFields: EvaluationField[];
    onClick?: () => void;
    className?: string;
}

const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'bg-green-600 text-white';
    if (score >= 3.5) return 'bg-teal-600 text-white';
    if (score >= 2.5) return 'bg-yellow-600 text-white';
    if (score >= 1.5) return 'bg-orange-600 text-white';
    return 'bg-red-600 text-white';
};

const CollaboratorEvaluationCard: React.FC<CollaboratorEvaluationCardProps> = ({
    collaborator,
    evaluationFields,
    onClick,
    className = '',
}) => {
    const image = collaborator.image || collaborator.avatar;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    return (
        <div
            className={`flex ${isMobile ? 'items-center' : 'flex-row items-center'} justify-between bg-white rounded-lg sm:rounded-2xl px-2 sm:px-6 py-2 sm:py-3 gap-2 sm:gap-4 border border-[#f0f0f0] min-h-0 h-auto ${className}`}
            onClick={onClick}
            style={{
                minHeight: isMobile ? 48 : 56,
                maxHeight: isMobile ? 64 : undefined,
            }}
        >
            {/* Esquerda: Avatar, nome, cargo, status */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                <CollaboratorCard
                    collaborator={{
                        id: collaborator.nome,
                        nome: collaborator.nome,
                        cargo: collaborator.cargo,
                        image,
                    }}
                    variant="compact"
                />
                <Badge
                    label={collaborator.status}
                    variant={collaborator.statusVariant || 'default'}
                    size="sm"
                    className="ml-1 sm:ml-2"
                />
            </div>
            {/* Direita: Campos de avaliação + seta (mobile: lado a lado) */}
            <div className="flex items-center gap-2 sm:gap-4">
                {evaluationFields.map((field, idx) => {
                    const isNotaFinal =
                        field.label === 'Nota final' &&
                        typeof field.value === 'number';
                    const colorClass = isNotaFinal
                        ? getScoreColor(field.value as number)
                        : 'bg-neutral-100 text-[#167174]';
                    return (
                        <div
                            key={field.label + idx}
                            className="flex flex-col items-center min-w-[48px] sm:min-w-[80px]"
                        >
                            <Typography
                                variant="caption"
                                className="text-neutral-500 mb-1 text-xs font-normal hidden sm:block"
                            >
                                {field.label}
                            </Typography>
                            <div
                                className={`rounded text-base font-semibold px-2 sm:px-4 py-1 min-w-[32px] sm:min-w-[36px] text-center ${colorClass}`}
                                style={{ minHeight: 28 }}
                            >
                                {field.value !== undefined &&
                                field.value !== null &&
                                field.value !== ''
                                    ? typeof field.value === 'number'
                                        ? field.value.toFixed(1)
                                        : field.value
                                    : '-'}
                            </div>
                        </div>
                    );
                })}
                {/* Seta de navegação ao lado da nota final no mobile */}
                <div className="ml-2 sm:ml-4 text-gray-400 flex-shrink-0 flex items-center h-full">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path
                            d="M9 6l6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default CollaboratorEvaluationCard;
