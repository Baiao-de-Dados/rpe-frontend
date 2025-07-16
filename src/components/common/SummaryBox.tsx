import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import Typography from './Typography';
import Button from './Button';

interface SummaryBoxProps {
    summary: string | {
        code: string;
        rating?: number;
        detailedAnalysis?: string;
        summary?: string;
        discrepancies?: string;
    };
    icon?: React.ReactNode;
    title?: string;
    className?: string;
}

const SummaryBox: React.FC<SummaryBoxProps> = ({
    summary,
    icon = <Sparkles className="text-primary-500" size={18} fill="currentColor" />,
    title = 'Resumo',
    className = '',
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Verificar se é um objeto JSON (novo formato) ou string (formato antigo)
    const isJsonSummary = typeof summary === 'object' && summary !== null;
    
    // Extrair dados do resumo
    const summaryData = isJsonSummary ? summary : null;
    const summaryText = isJsonSummary ? summaryData?.summary || 'Resumo não disponível' : summary;
    const detailedText = isJsonSummary ? summaryData?.detailedAnalysis || 'Análise detalhada não disponível' : '';
    const hasDetailedContent = isJsonSummary && summaryData?.detailedAnalysis;
    
    // Mostrar botão de expandir apenas se há conteúdo detalhado
    const showExpandButton = hasDetailedContent;

    return (
        <div className={`flex overflow-hidden ${className}`}>
            {/* Barra vertical na cor primária - sem margem, integrada ao container */}
            <div className="w-1 bg-primary-500 flex-shrink-0"></div>

            {/* Conteúdo - sem arredondamento à esquerda para encontrar com a barra */}
            <div className="flex-1 bg-neutral-50 p-3">
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                        <span className="text-primary-500 mr-1 flex-shrink-0">
                            {icon}
                        </span>

                        {/* Usando Typography para o título */}
                        <Typography variant="caption" className="font-medium">
                            {title}
                        </Typography>
                    </div>

                    {/* Botão de expandir/recolher */}
                    {showExpandButton && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-1 h-auto text-gray-500 hover:text-gray-700 border-0"
                        >
                            {isExpanded ? (
                                <ChevronUp size={16} />
                            ) : (
                                <ChevronDown size={16} />
                            )}
                        </Button>
                    )}
                </div>

                {/* Conteúdo do resumo */}
                <div className="space-y-2">
                    {/* Resumo inicial (sempre visível) */}
                    <Typography
                        variant="body"
                        color="muted"
                        className="text-sm leading-relaxed"
                        
                    >
                        {summaryText}
                    </Typography>

                    {/* Conteúdo detalhado (visível apenas quando expandido) */}
                    {isExpanded && hasDetailedContent && (
                        <div className="pt-2 border-t border-gray-200">
                            <Typography
                                variant="caption"
                                className="font-medium text-gray-700 mb-1 block"
                            >
                                Análise Detalhada
                            </Typography>
                            <Typography
                                variant="body"
                                color="muted"
                                className="text-sm leading-relaxed"
                            >
                                {detailedText}
                            </Typography>
                        </div>
                    )}

                    {/* Discrepâncias (se existir) */}
                    {isExpanded && summaryData?.discrepancies && (
                        <div className="pt-2 border-t border-gray-200">
                            <Typography
                                variant="caption"
                                className="font-medium text-orange-600 mb-1 block"
                            >
                                Discrepâncias Identificadas
                            </Typography>
                            <Typography
                                variant="body"
                                color="muted"
                                className="text-sm leading-relaxed text-orange-700"
                            >
                                {summaryData.discrepancies}
                            </Typography>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SummaryBox;
