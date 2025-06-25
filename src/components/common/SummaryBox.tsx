import React from 'react';
import { Sparkles } from 'lucide-react';
import Typography from './Typography';

interface SummaryBoxProps {
    summary: string;
    icon?: React.ReactNode;
    title?: string;
    className?: string;
}

const SummaryBox: React.FC<SummaryBoxProps> = ({
    summary,
    icon = <Sparkles className="text-primary-500" size={18} />,
    title = 'Resumo',
    className = '',
}) => {
    return (
        <div className={`flex overflow-hidden ${className}`}>
            {/* Barra vertical na cor primária - sem margem, integrada ao container */}
            <div className="w-1 bg-primary-500 flex-shrink-0"></div>

            {/* Conteúdo - sem arredondamento à esquerda para encontrar com a barra */}
            <div className="flex-1 bg-neutral-50 p-3">
                <div className="flex items-center mb-1">
                    <span className="text-primary-500 mr-1 flex-shrink-0">
                        {icon}
                    </span>

                    {/* Usando Typography para o título */}
                    <Typography variant="caption" className="font-medium">
                        {title}
                    </Typography>
                </div>

                {/* Usando Typography para o texto do resumo de forma clara e visível */}
                <Typography
                    variant="body"
                    color="muted"
                    className="text-sm leading-relaxed"
                >
                    {summary}
                </Typography>
            </div>
        </div>
    );
};

export default SummaryBox;
