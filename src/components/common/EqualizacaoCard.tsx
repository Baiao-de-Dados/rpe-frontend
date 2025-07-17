import React from 'react';
import Typography from './Typography';
import CardContainer from './CardContainer';
import SummaryBox from './SummaryBox';
import StarRating from './StarRating';
import TextAreaWithTitle from './TextAreaWithTitle';
import Button from './Button';
import RatingDisplay from './RatingDisplay';
import { getScoreColor } from '../../utils/colorUtils';
import CollaboratorCard from './CollaboratorCard';
import Badge from './Badge';
import { useToast } from '../../hooks/useToast';
import { useState, useEffect } from 'react';
import { Sparkles, FileDown, Loader2 } from 'lucide-react';

interface EqualizacaoCardProps {
    collaboratorName: string;
    position: string;
    status: 'Finalizado' | 'Em andamento';
    finalScore: number | null;
    selfEvalScore?: number | null;
    managerEvalScore?: number | null;
    postureScore?: number | null;
    summary?: string | {
        code: string;
        rating?: number;
        detailedAnalysis?: string;
        summary?: string;
        discrepancies?: string;
    };
    rating?: number;
    onChangeRating?: (value: number | null) => void;
    ratingError?: string;
    justification?: string;
    onChangeJustification?: ((e: React.ChangeEvent<HTMLTextAreaElement>) => void) | ((value: string) => void);
    justificationError?: string;
    editable?: boolean;
    onClick?: () => void;
    onSubmit?: () => void;
    // ✅ NOVO: Prop para controlar diretamente o estado de edição
    isReadOnly?: boolean;
    // ✅ NOVO: Callback para quando entrar em modo de edição
    onEnterEditMode?: () => void;
    // ✅ NOVO: Props para geração de resumo da IA
    onGenerateAiSummary?: () => void;
    hasAiSummary?: boolean;
    // ✅ NOVO: Props para exportar relatório
    onExportReport?: () => void;
    // NOVO: indica se está gerando resumo
    isGeneratingSummary?: boolean;
}

const EqualizacaoCard: React.FC<EqualizacaoCardProps> = ({

    collaboratorName,
    position,
    status,
    finalScore,
    selfEvalScore,
    managerEvalScore,
    postureScore,
    summary = '',
    rating,
    onChangeRating,
    ratingError,
    justification,
    onChangeJustification,
    justificationError,
    onClick,
    onSubmit,
    isReadOnly,
    onEnterEditMode,
    onGenerateAiSummary,
    hasAiSummary = false,
    onExportReport,
    isGeneratingSummary = false,
}) => {
    const { showToast } = useToast();
    // ✅ CORREÇÃO: Usar isReadOnly se fornecido, senão usar status
    const [isEditing, setIsEditing] = useState(
        isReadOnly !== undefined ? !isReadOnly : status === 'Em andamento'
    );
    
    // ✅ CORREÇÃO: Atualizar estado de edição quando isReadOnly ou status mudar
    useEffect(() => {
        if (isReadOnly !== undefined) {
            setIsEditing(!isReadOnly);
        } else {
            setIsEditing(status === 'Em andamento');
        }
    }, [isReadOnly, status]);
    
    // ✅ CORREÇÃO: Forçar modo readonly quando isReadOnly for true
    useEffect(() => {
        if (isReadOnly === true) {
            setIsEditing(false);
        }
    }, [isReadOnly]);

    const handleConcluir = () => {
        console.log('🎯 EqualizacaoCard: Botão Concluir clicado!');
        if (onSubmit) {
            onSubmit();
            // ✅ CORREÇÃO: Não mostrar toast aqui, será mostrado pelo componente pai
            // ✅ CORREÇÃO: Não mudar isEditing aqui, será controlado pelo status
        } else {
            console.warn('⚠️ EqualizacaoCard: onSubmit não foi passada');
        }
    };

    const handleEditar = () => {
        console.log('🎯 EqualizacaoCard: Entrando em modo de edição');
        setIsEditing(true);
        if (onEnterEditMode) {
            onEnterEditMode();
        }
    };
    
    // ✅ CORREÇÃO: Chamar onEnterEditMode quando mudar de readonly para edição
    useEffect(() => {
        if (isEditing && isReadOnly === true && onEnterEditMode) {
            console.log('🎯 EqualizacaoCard: Mudando de readonly para edição');
            onEnterEditMode();
        }
    }, [isEditing, isReadOnly, onEnterEditMode]);

    const handleExportar = () => {
        if (onExportReport) {
            onExportReport();
        } else {
            showToast('Funcionalidade de exportação não disponível', 'info');
        }
    };

    return (
        <CardContainer className="hover:shadow-md transition-shadow border border-gray-200">
            <div className={onClick ? 'cursor-pointer' : ''} onClick={onClick}>
                {/* Header: Colaborador + Status + Scores */}
                <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3">
                        <CollaboratorCard 
                            collaborator={{ name: collaboratorName, position }}
                            variant="detailed"
                        />
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
                    {/* Linha de scores */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Auto:</span>
                            <RatingDisplay rating={selfEvalScore ?? null} />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Gestor:</span>
                            <RatingDisplay rating={managerEvalScore ?? null} />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">360°:</span>
                            <RatingDisplay rating={postureScore ?? null} />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Final:</span>
                            <RatingDisplay rating={finalScore ?? null} final />
                        </div>
                    </div>
                </div>
                
                {/* Botões de ação */}
                <div className="flex items-center gap-2 py-3">
                    {onGenerateAiSummary && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onGenerateAiSummary}
                            disabled={hasAiSummary || isGeneratingSummary}
                            title={hasAiSummary ? 'Resumo já foi gerado' : isGeneratingSummary ? 'Gerando resumo...' : 'Gerar resumo da IA'}
                            className="flex items-center gap-1"
                        >
                            {isGeneratingSummary ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <Sparkles size={14} />
                            )}
                            {isGeneratingSummary
                                ? 'Gerando resumo...'
                                : hasAiSummary
                                    ? 'Resumo gerado'
                                    : 'Gerar Resumo'}
                        </Button>
                    )}
                </div>

                {/* Barras de progresso das avaliações */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                            >
                                {selfEvalScore?.toFixed(1) || 'N/A'}
                            </span>
                        </div>
                        <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full">
                            <div
                                className="h-3 sm:h-4 rounded-full"
                                style={{ width: `${selfEvalScore ? selfEvalScore * 20 : 0}%`, backgroundColor: getScoreColor(selfEvalScore || 0) }}
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
                            >
                                {managerEvalScore?.toFixed(1) || 'N/A'}
                            </span>
                        </div>
                        <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full">
                            <div
                                className="h-3 sm:h-4 rounded-full"
                                style={{ width: `${managerEvalScore ? managerEvalScore * 20 : 0}%`, backgroundColor: getScoreColor(managerEvalScore || 0) }}
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
                            >
                                {postureScore?.toFixed(1) || 'N/A'}
                            </span>
                        </div>
                        <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full">
                            <div
                                className="h-3 sm:h-4 rounded-full"
                                style={{ width: `${postureScore ? postureScore * 20 : 0}%`, backgroundColor: getScoreColor(postureScore || 0) }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Resumo */}
                <div className="mt-2 mb-4">
                    <SummaryBox
                        summary={
                            status === 'Finalizado'
                                ? summary || 'Resumo será gerado automaticamente em breve.'
                                : '-'
                        }
                        isGeneratingSummary={isGeneratingSummary}
                    />
                </div>

                {/* Avaliação e Justificativa */}
                <div className="mt-6 pt-2 border-t border-gray-200">
                    {isEditing ? (
                        <>
                            <Typography variant="caption" className="text-gray-500 mb-2 block">
                                Dê uma avaliação de 1 a 5
                            </Typography>
                            <StarRating value={rating ?? 0} onChange={onChangeRating} />
                            {ratingError && <span className="text-red-600 text-sm">{ratingError}</span>}
                            <div className="mt-4" />
                            <TextAreaWithTitle
                                title="Justifique sua nota"
                                placeholder="Justifique sua nota"
                                value={justification ?? ''}
                                onChange={(e) => {
                                    if (typeof onChangeJustification === 'function') {
                                        if (onChangeJustification.length === 1 && typeof e === 'object' && 'target' in e) {
                                            (onChangeJustification as (e: React.ChangeEvent<HTMLTextAreaElement>) => void)(e);
                                        } else {
                                            (onChangeJustification as (value: string) => void)(e.target.value);
                                        }
                                    }
                                }}
                                error={justificationError}
                                minHeight="h-32"
                            />
                            {/* Botão dentro do card */}
                            {onSubmit && (
                                <div className="flex justify-end mt-6 gap-2">
                                    {onExportReport && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleExportar}
                                            title="Exportar relatório"
                                            className="p-2"
                                        >
                                            <FileDown size={16} />
                                        </Button>
                                    )}
                                    <Button type="button" variant="primary" onClick={handleConcluir}>
                                        Concluir
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col gap-4">
                                <Typography variant="caption" className="text-gray-500 mb-2 block">
                                    Nota atribuída
                                </Typography>
                                <StarRating value={rating ?? 0} readOnly />
                                <TextAreaWithTitle
                                    title="Justificativa"
                                    placeholder="Justificativa"
                                    value={justification ?? ''}
                                    readOnly
                                    minHeight="h-32"
                                />
                            </div>
                            <div className="flex gap-3 justify-end mt-6">
                                {onExportReport && (
                                    <Button 
                                        variant="outline" 
                                        onClick={handleExportar}
                                        title="Exportar relatório"
                                        className="p-2"
                                    >
                                        <FileDown size={16} />
                                    </Button>
                                )}
                                <Button variant="outline" onClick={handleEditar}>
                                    Editar resultado
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </CardContainer>
    );
};

export default EqualizacaoCard;
