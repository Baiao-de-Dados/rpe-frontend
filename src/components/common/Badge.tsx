import React, { useState } from 'react';
import { CHART_COLORS } from '../../utils/colorUtils';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default';
export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
    label: string;
    variant?: BadgeVariant;
    size?: BadgeSize;
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({
    label,
    variant = 'default',
    size = 'md',
    className = '',
}) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMobileClick = () => {
        if (window.innerWidth < 640) {
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 3000);
        }
    };
    // Mapeamento de cores usando as cores padronizadas do sistema
    const variantClasses = {
        // Success - Verde similar ao do gráfico
        success: `bg-[#edf7ef] text-[${CHART_COLORS.EXCELLENT}]`,
        
        // Warning - Amarelo similar ao do gráfico
        warning: `bg-[#fff8e1] text-[${CHART_COLORS.AVERAGE}]`,
        
        // Error - Vermelho similar ao do gráfico
        error: `bg-[#fdf1f1] text-[${CHART_COLORS.POOR}]`,
        
        // Info - Azul teal similar ao do gráfico
        info: `bg-[#e6f3f3] text-[${CHART_COLORS.GOOD}]`,
        
        // Default - Usando cinzas neutros
        default: 'bg-neutral-100 text-neutral-500',
    };

    // Cores para as bolinhas móveis (apenas a cor sólida)
    const mobileDotClasses = {
        success: `bg-[${CHART_COLORS.EXCELLENT}]`,
        warning: `bg-[${CHART_COLORS.AVERAGE}]`,
        error: `bg-[${CHART_COLORS.POOR}]`,
        info: `bg-[${CHART_COLORS.GOOD}]`,
        default: 'bg-neutral-500',
    };

    const sizeClasses = {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-3 py-1',
        lg: 'text-base px-4 py-1.5',
    };

    // Tamanhos das bolinhas móveis
    const mobileDotSizes = {
        sm: 'w-3 h-3',
        md: 'w-3 h-3',
        lg: 'w-4 h-4',
    };

    return (
        <>
            <span
                className={`
                    hidden sm:inline-block font-bold rounded-md
                    ${variantClasses[variant]}
                    ${sizeClasses[size]}
                    ${className}
                `}
            >
                {label}
            </span>
            
            <div className="relative sm:hidden">
                <span
                    className={`
                        inline-block rounded-full cursor-pointer
                        ${mobileDotClasses[variant]}
                        ${mobileDotSizes[size]}
                        ${className}
                    `}
                    onClick={handleMobileClick}
                />
                
                {showTooltip && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-50">
                        {label}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-gray-800"></div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Badge;
