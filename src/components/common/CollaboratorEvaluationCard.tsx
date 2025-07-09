import React from 'react';
import CollaboratorCard from './CollaboratorCard';
import Badge from './Badge';
import Typography from './Typography';
import EvaluationScoreDisplay from './EvaluationScoreDisplay';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

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

const CollaboratorEvaluationCard: React.FC<CollaboratorEvaluationCardProps> = ({
    collaborator,
    evaluationFields,
    onClick,
    className = '',
}) => {
    const image = collaborator.image || collaborator.avatar;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

    // Nome abreviado no mobile
    let displayName = collaborator.nome;
    if (isMobile) {
        const parts = collaborator.nome.trim().split(' ');
        if (parts.length > 1) {
            displayName = `${parts[0]} ${parts[1][0].toUpperCase()}.`;
        } else {
            displayName = parts[0];
        }
    }

    return (
        <div
            className={`flex ${isMobile ? 'flex-row items-center' : 'sm:flex-row items-center'} justify-between bg-white rounded-lg sm:rounded-2xl px-2 sm:px-6 py-2 sm:py-3 gap-2 sm:gap-4 border border-[#f0f0f0] min-h-0 h-auto ${className}`}
            onClick={onClick}
            style={{
                minHeight: isMobile ? 48 : 56,
                maxHeight: isMobile ? 64 : undefined,
            }}
        >
            {/* Esquerda: Avatar, nome, cargo */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                <CollaboratorCard
                    collaborator={{
                        id: collaborator.nome,
                        nome: displayName,
                        cargo: collaborator.cargo,
                        image,
                    }}
                    variant="compact"
                />
            </div>
            {/* Direita: Campos de avaliação + badge + seta */}
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-end w-full sm:max-w-[60%]">
                {/* Badge no desktop ao lado dos campos de avaliação */}
                {!isMobile && (
                    <Badge
                        label={collaborator.status}
                        variant={collaborator.statusVariant || 'default'}
                        size="sm"
                        className="ml-1 sm:ml-2"
                    />
                )}
                
                {/* Badge no mobile ao lado esquerdo da nota final */}
                {isMobile && (
                    <Badge
                        label={collaborator.status}
                        variant={collaborator.statusVariant || 'default'}
                        size="sm"
                    />
                )}
                
                {evaluationFields.map((field, idx) => {

                    if (typeof field.value === 'number' || field.value === null || field.value === undefined) {
                        return (
                            <EvaluationScoreDisplay
                                key={field.label + idx}
                                score={typeof field.value === 'number' ? field.value : null}
                                label={field.label}
                                showLabel={true}
                            />
                        );
                    }
                    
                    const badgeStyle: React.CSSProperties = {};
                    const badgeClass = 'bg-neutral-100 text-[#167174]';
                    
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
                                className={`rounded text-base font-semibold px-2 sm:px-4 py-1 min-w-[32px] sm:min-w-[36px] text-center ${badgeClass}`}
                                style={{ minHeight: 28, ...badgeStyle }}
                            >
                                {field.value !== undefined &&
                                field.value !== null &&
                                field.value !== ''
                                    ? field.value
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
