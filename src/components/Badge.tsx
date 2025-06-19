import React from 'react';

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
    // Mapeamento de cores exatamente como na imagem
    const variantClasses = {
        success: 'bg-[#e8f5e9] text-[#4caf50]', // Verde claro/Verde - "Finalizado"
        warning: 'bg-[#fff8e1] text-[#ff9800]', // Amarelo claro/Amarelo - "Em andamento"
        error: 'bg-[#ffebee] text-[#f44336]', // Vermelho claro/Vermelho
        info: 'bg-[#e3f2fd] text-[#2196f3]', // Azul claro/Azul
        default: 'bg-neutral-100 text-neutral-600', // Cinza claro/Cinza
    };

    const sizeClasses = {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-3 py-1',
        lg: 'text-base px-4 py-1.5',
    };

    return (
        <span
            className={`
                inline-block font-bold rounded-md
                ${variantClasses[variant]}
                ${sizeClasses[size]}
                ${className}
            `}
        >
            {label}
        </span>
    );
};

export default Badge;
