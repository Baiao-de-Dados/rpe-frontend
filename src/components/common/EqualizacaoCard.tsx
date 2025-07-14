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
import { useState } from 'react';
import { FileDown } from 'lucide-react';

interface EqualizacaoCardProps {
    collaboratorName: string;
    position: string;
    status: 'Finalizado' | 'Em andamento';
    finalScore: number;
    selfEvalScore?: number;
    managerEvalScore?: number;
    postureScore?: number;
    summary?: string;
    rating?: number;
    onChangeRating?: (value: number | null) => void;
    ratingError?: string;
    justification?: string;
    onChangeJustification?: ((e: React.ChangeEvent<HTMLTextAreaElement>) => void) | ((value: string) => void);
    justificationError?: string;
    editable?: boolean;
    onClick?: () => void;
    onSubmit?: () => void;
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
    rating,
    onChangeRating,
    ratingError,
    justification,
    onChangeJustification,
    justificationError,
    onClick,
    onSubmit,
}) => {
    const { showToast } = useToast();
    const [isEditing, setIsEditing] = useState(true);

    const handleConcluir = () => {
        if (onSubmit) onSubmit();
        showToast('Equalização salva com sucesso', 'success');
        setIsEditing(false);
    };

    const handleEditar = () => {
        setIsEditing(true);
    };

    const handleExportar = () => {
        // Simula exportação de relatório
        showToast('Relatório exportado!', 'success');
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
                        <div className="flex flex-col items-center min-w-[70px]">
                            <Typography variant="caption" className="text-gray-500 text-xs mb-1">Autoavaliação</Typography>
                            <RatingDisplay rating={selfEvalScore} />
                        </div>
                        <div className="flex flex-col items-center min-w-[70px]">
                            <Typography variant="caption" className="text-gray-500 text-xs mb-1">Avaliação 360</Typography>
                            <RatingDisplay rating={postureScore} />
                        </div>
                        <div className="flex flex-col items-center min-w-[70px]">
                            <Typography variant="caption" className="text-gray-500 text-xs mb-1">Nota gestor</Typography>
                            <RatingDisplay rating={managerEvalScore} />
                        </div>
                        <div className="flex flex-col items-center min-w-[70px]">
                            <Typography variant="caption" className="text-gray-500 text-xs mb-1">Nota final</Typography>
                            <RatingDisplay rating={finalScore ?? null} final />
                        </div>
                    </div>
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
                                {selfEvalScore.toFixed(1)}
                            </span>
                        </div>
                        <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full">
                            <div
                                className="h-3 sm:h-4 rounded-full"
                                style={{ width: `${selfEvalScore * 20}%`, backgroundColor: getScoreColor(selfEvalScore) }}
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
                                {managerEvalScore.toFixed(1)}
                            </span>
                        </div>
                        <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full">
                            <div
                                className="h-3 sm:h-4 rounded-full"
                                style={{ width: `${managerEvalScore * 20}%`, backgroundColor: getScoreColor(managerEvalScore) }}
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
                                {postureScore.toFixed(1)}
                            </span>
                        </div>
                        <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full">
                            <div
                                className="h-3 sm:h-4 rounded-full"
                                style={{ width: `${postureScore * 20}%`, backgroundColor: getScoreColor(postureScore) }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Resumo */}
                <div className="mt-2 mb-4">
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
                                <div className="flex justify-end mt-6">
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
                                <Button variant="outline" onClick={handleExportar}>
                                    <FileDown className="w-5 h-5" />
                                </Button>
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
