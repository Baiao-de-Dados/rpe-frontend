import { useState, useEffect } from 'react';
import { getScoreColor } from '../../utils/colorUtils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
    label: string;
    variant?: BadgeVariant;
    size?: BadgeSize;
    className?: string;
    score?: number;
}

const Badge: React.FC<BadgeProps> = ({
    label,
    variant = 'default',
    size = 'md',
    className = '',
    score
}) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMobileClick = () => {
        if (window.innerWidth < 640) {
            setShowTooltip(true);
        }
    };

    useEffect(() => {
        if (showTooltip) {
            const timer = setTimeout(() => {
                setShowTooltip(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showTooltip]);

    // Estilos inline para garantir que funcionem em produção
    const getVariantStyles = () => {
        if (score !== undefined) {
            const color = getScoreColor(score);
            if (score >= 4.5) return { backgroundColor: '#edf7ef', color: color };
            if (score >= 3.5) return { backgroundColor: '#e6f3f3', color: color };
            if (score >= 2.5) return { backgroundColor: '#fff8e1', color: color };
            if (score >= 1.5) return { backgroundColor: '#fff3e0', color: color };
            return { backgroundColor: '#fdf1f1', color: color };
        }

        switch (variant) {
            case 'success':
                return { backgroundColor: '#edf7ef', color: '#5CB85C' };
            case 'warning':
                return { backgroundColor: '#fff8e1', color: '#F0AD4E' };
            case 'error':
                return { backgroundColor: '#fdf1f1', color: '#D9534F' };
            case 'info':
                return { backgroundColor: '#e6f3f3', color: '#09A6A6' };
            default:
                return { backgroundColor: '#f5f5f5', color: '#8b949e' };
        }
    };

    const getDotStyles = () => {
        if (score !== undefined) {
            return { backgroundColor: getScoreColor(score) };
        }

        switch (variant) {
            case 'success':
                return { backgroundColor: '#5CB85C' };
            case 'warning':
                return { backgroundColor: '#F0AD4E' };
            case 'error':
                return { backgroundColor: '#D9534F' };
            case 'info':
                return { backgroundColor: '#09A6A6' };
            default:
                return { backgroundColor: '#8b949e' };
        }
    };

    const sizeClasses = {
        sm: { badge: 'text-xs px-2 py-1', dot: 'w-2 h-2' },
        md: { badge: 'text-sm px-3 py-1', dot: 'w-3 h-3' },
        lg: { badge: 'text-base px-4 py-2', dot: 'w-4 h-4' },
    };

    const badgeStyles = getVariantStyles();
    const dotStyles = getDotStyles();

    return (
        <div className="relative">
            {/* Badge para desktop */}
            <span
                className={`hidden sm:inline-block rounded-full font-medium ${sizeClasses[size].badge} ${className}`}
                style={badgeStyles}
            >
                {label}
            </span>
            
            {/* Bolinha para mobile */}
            <div
                className={`sm:hidden inline-block rounded-full cursor-pointer ${sizeClasses[size].dot} ${className}`}
                style={dotStyles}
                onClick={handleMobileClick}
            />
            
            {/* Tooltip */}
            {showTooltip && (
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
                    {label}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
            )}
        </div>
    );
};

export default Badge;