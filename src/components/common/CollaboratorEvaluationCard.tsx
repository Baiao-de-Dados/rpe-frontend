import React from 'react';
import CollaboratorCard from './CollaboratorCard';
import Badge from './Badge';
import Typography from './Typography';
import { getScoreBgStyles } from '../../utils/colorUtils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface EvaluationField {
    label: string;
    value?: string | number;
    bold?: boolean;
    customStyle?: 'manager-evaluated'; // Para styling especial da nota do gestor
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

    // Cargo abreviado no mobile
    let displayCargo = collaborator.cargo;
    if (isMobile) {
        // Primeiro, substitui palavras muito comuns por abreviações
        displayCargo = displayCargo
            .replace(/Desenvolvedor|Desenvolvedora/gi, 'Dev')
            .replace(/Analista/gi, 'Ana')
            .replace(/Coordenador|Coordenadora/gi, 'Coord')
            .replace(/Gerente/gi, 'Ger')
            .replace(/Especialista/gi, 'Esp');

        // Depois aplica a lógica de abreviação geral
        if (displayCargo.length > 10) {
            const words = displayCargo.split(' ');
            if (words.length > 1) {
                // Pega só a primeira palavra + primeira letra da segunda
                displayCargo = words[0] + ' ' + words[1][0].toUpperCase() + '.';
            } else {
                // Se for uma palavra só, corta bem mais
                displayCargo = displayCargo.substring(0, 8) + '...';
            }
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
                        cargo: displayCargo,
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
                    const isNotaFinal =
                        field.label === 'Nota final' &&
                        typeof field.value === 'number';
                    
                    const isManagerEvaluated = field.customStyle === 'manager-evaluated';
                    
                    let badgeStyle: React.CSSProperties = {};
                    let badgeClass = 'bg-neutral-100 text-[#167174]';
                    
                    if (isManagerEvaluated && typeof field.value === 'number') {
                        // Nota do gestor finalizada: background primary-500 com texto branco
                        badgeStyle = { backgroundColor: '#167174', color: 'white' };
                        badgeClass = '';
                    } else if (isNotaFinal && typeof field.value === 'number') {
                        badgeStyle = getScoreBgStyles(field.value as number);
                        badgeClass = '';
                    }
                    
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
